import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('user_liked_event')
export class UserLikedEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.liked, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Event, (event) => event.likes, { onDelete: 'CASCADE' })
  event: Event;
}
