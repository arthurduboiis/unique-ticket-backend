import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';

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
