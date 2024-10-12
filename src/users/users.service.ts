import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // Créer un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { likedEvents, ...userData } = createUserDto;

    // Charger les événements si des IDs sont fournis
    let events: Event[] = [];
    if (likedEvents && likedEvents.length > 0) {
      events = await this.eventRepository.findBy({ id: In(likedEvents) });
    }

    // Créer l'utilisateur avec les événements aimés
    const user = this.userRepository.create({
      ...userData,
      likedEvents: events,
    });

    // Sauvegarder l'utilisateur dans la base de données
    return this.userRepository.save(user);
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    
    return this.userRepository.find(); // Charger les relations si nécessaire
  }

  // Récupérer un utilisateur par son ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['likedEvents', 'following'], // Charger les relations si nécessaire
    });
  }

  // Mettre à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { likedEvents, ...userData } = updateUserDto;

    // Charger les événements si des IDs sont fournis
    let events: Event[] = [];
    if (likedEvents && likedEvents.length > 0) {
      events = await this.eventRepository.findBy({ id: In(likedEvents) });
    }

    // Mise à jour des données utilisateur
    await this.userRepository.update(id, {
      ...userData,
      likedEvents: events,
    });

    // Récupérer et retourner l'utilisateur mis à jour
    return this.userRepository.findOne({
      where: { id },
      relations: ['likedEvents', 'following'],
    });
  }

  // Supprimer un utilisateur par son ID
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
