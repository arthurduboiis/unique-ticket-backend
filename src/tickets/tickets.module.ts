import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { User } from '../users/entities/user.entity'; // Si tu as aussi besoin de UserRepository
import { EventsModule } from '../events/events.module'; // Importe EventsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User]),  // Importe les repositories de Ticket et User
    EventsModule,  // Importe le module qui contient EventRepository
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
