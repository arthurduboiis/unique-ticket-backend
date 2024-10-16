import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';  // Entité Event
import { EventsService } from './events.service'; // Service pour gérer les événements
import { EventsController } from './events.controller';
import { Company } from '../companies/entities/company.entity';
import { TicketCategory } from './entities/ticket-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Company, TicketCategory])], // Import du repository Event
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, TypeOrmModule], // Exporte EventsService et le repository Event
})
export class EventsModule {}

