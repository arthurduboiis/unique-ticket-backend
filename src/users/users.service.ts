import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Event } from '../events/entities/event.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) { }

  // Créer un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { ...userData } = createUserDto;
    const user = this.userRepository.create({
      ...userData,
    });

    // Sauvegarder l'utilisateur dans la base de données
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['liked', 'following'],
    });
  }

  // Récupérer un utilisateur par son ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['liked', 'following'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['liked', 'following'] });
  }

  // Mettre à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Charger l'utilisateur existant
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['liked', 'following'], // Charger les relations existantes
    });

    if (!user) {
      throw new Error('User not found'); // Gérer le cas où l'utilisateur n'existe pas
    }

    // Si des événements liked sont fournis, charger les événements à partir des IDs
    if (updateUserDto.liked && updateUserDto.liked.length > 0) {
      const likedEvents = await this.eventRepository.findBy({
        id: In(updateUserDto.liked), // Charger les événements par leurs IDs
      });
      user.liked = likedEvents; // Assigner les nouveaux événements aimés
    }

    // Mettre à jour d'autres champs de l'utilisateur
    Object.assign(user, updateUserDto);

    // Sauvegarder l'utilisateur avec les nouvelles relations
    return this.userRepository.save(user); // Utiliser save pour mettre à jour les relations et les autres champs
  }

  // Supprimer un utilisateur par son ID
  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return "L'utilisateur a été supprimé avec succès.";
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<string> {
    // Récupérer l'utilisateur à partir de son ID
    const user = await this.findOne(userId);
  
    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé.");
    }
    console.log(user);
  
    // Vérifier si l'ancien mot de passe est correct
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException("L'ancien mot de passe est incorrect.");
    }
  
    // Vérifier si le nouveau mot de passe et la confirmation correspondent
    if (newPassword !== confirmPassword) {
      throw new ConflictException("Le nouveau mot de passe et la confirmation ne correspondent pas.");
    }
  
    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Mettre à jour le mot de passe dans la base de données
    user.password = hashedPassword;
    await this.userRepository.save(user);
  
    return "Le mot de passe a été mis à jour avec succès.";
  }
}
