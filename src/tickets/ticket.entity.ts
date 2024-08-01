import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  tokenId: number;

  @Column()
  used: boolean;

  @ManyToOne(() => Event, event => event.tickets)
  event: Event;

  @ManyToOne(() => User, user => user.tickets)
  user: User;
}
