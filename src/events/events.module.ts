import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './event.entity';
import { TicketCategory } from './ticket-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, TicketCategory])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
