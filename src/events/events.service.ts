import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { TicketCategory } from './ticket-category.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(TicketCategory)
    private readonly ticketCategoryRepository: Repository<TicketCategory>
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }

  create(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }

  async createTicketCategory(
    eventId: number,
    ticketCategory: TicketCategory
  ): Promise<TicketCategory> {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    ticketCategory.event = event;
    return this.ticketCategoryRepository.save(ticketCategory);
  }
}
