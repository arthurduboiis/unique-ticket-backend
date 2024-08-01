import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketsService.create(ticket);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ticketsService.remove(id);
  }

  @Get('event/:eventId')
  findByEventId(@Param('eventId') eventId: number): Promise<Ticket[]> {
    return this.ticketsService.findByEventId(eventId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number): Promise<Ticket[]> {
    return this.ticketsService.findByUserId(userId);
  }
}
