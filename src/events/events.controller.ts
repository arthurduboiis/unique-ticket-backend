import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { TicketCategory } from './ticket-category.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() event: Event): Promise<Event> {
    return this.eventsService.create(event);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.eventsService.remove(id);
  }

  @Post(':id/ticket-categories')
  createTicketCategory(
    @Param('id') id: number,
    @Body() ticketCategory: TicketCategory
  ): Promise<TicketCategory> {
    return this.eventsService.createTicketCategory(id, ticketCategory);
  }
}
