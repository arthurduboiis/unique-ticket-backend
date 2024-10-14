import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Company } from 'src/companies/entities/company.entity';
import { TicketCategory } from './entities/ticket-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Company, TicketCategory])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [TypeOrmModule],
})
export class EventsModule {}
