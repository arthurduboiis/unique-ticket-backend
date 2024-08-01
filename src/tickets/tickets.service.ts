import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly crmUserRepository: Repository<User>
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOneBy({ id });
  }

  async create(ticket: Ticket): Promise<Ticket> {
    const event = await this.eventRepository.findOneBy({ id: ticket.event.id });
    const user = await this.crmUserRepository.findOneBy({ id: ticket.user.id });

    if (event && user) {
      ticket.event = event;
      ticket.user = user;
      return this.ticketRepository.save(ticket);
    }

    throw new Error('Event or User not found');
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async findByEventId(eventId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        event: { id: eventId },
      },
    });
  }

  async findByUserId(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }
}
