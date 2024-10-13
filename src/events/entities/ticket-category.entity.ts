import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('ticket_categories')
export class TicketCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column({nullable: true})
  categoryDescription: string;

  @Column('decimal')
  price: number;

  @Column()
  totalTickets: number;

  @Column()
  availableTickets: number;

  @Column()
  ticketsScanned: number;

  @Column()
  availabilityDateTickets: Date;

  @ManyToOne(() => Event, (event) => event.ticketCategories)
  event: Event;
}