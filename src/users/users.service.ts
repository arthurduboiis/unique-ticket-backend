import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Event } from '../events/entities/event.entity'; // Import de l'entité Event

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Event)  // Injecter le repository Event
    private eventRepository: Repository<Event>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { likedEvents, ...userData } = createUserDto;

    // Charger les événements si des IDs sont fournis
    let events: Event[] = [];
    if (likedEvents && likedEvents.length > 0) {
      events = await this.eventRepository.findBy({ id: In(likedEvents) });  // Utiliser findBy avec In
    }

    // Créer l'utilisateur avec les événements aimés
    const user = this.userRepository.create({
      ...userData,
      likedEvents: events,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
