import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Patch(':id')
  async updateTicketUsed(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Get('user/:userId')
  async findAllTicketsForUser(@Param('userId') userId: number) {
    return this.ticketsService.findAllTicketsForUser(userId);
  }

  // Obtenir tous les tickets d'un utilisateur entre deux dates (non utilisés)
  @Get('user/:userId/filter')
  async findTicketsForUserBetweenDates(
    @Param('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.ticketsService.findTicketsForUserBetweenDates(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
