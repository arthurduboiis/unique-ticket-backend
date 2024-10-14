import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class TicketsService {

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { eventId, userId, ...ticketData } = createTicketDto;
  
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!event || !user) {
      throw new Error('Event or User not found');
    }
  
    const ticket = this.ticketRepository.create({
      ...ticketData,
      event,
      user,
    });
  
    return this.ticketRepository.save(ticket);
  }

  async findAllTicketsForUser(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { user: { id: userId } }, // Trouver les tickets de cet utilisateur
      relations: ['event'], // Charger les événements associés
    });
  }

  async findTicketsForUserBetweenDates(userId: number, startDate: Date, endDate: Date): Promise<Ticket[]> {
    return this.ticketRepository.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.event', 'event') // Jointure avec les événements
      .where('ticket.userId = :userId', { userId })
      .andWhere('event.startDate >= :startDate', { startDate })
      .andWhere('event.endDate <= :endDate', { endDate })
      .andWhere('ticket.used = false') // Seuls les tickets non utilisés
      .getMany();
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    ticket.used = updateTicketDto.used; // Ici on met "used" à true
    return this.ticketRepository.save(ticket);
  }
}
