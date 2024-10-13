import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Company } from '../../companies/entities/company.entity';
import { Event } from '../../events/entities/event.entity';
import { UserCompanyFollowing } from '../../user-company-following/entities/user-company-following.entity';
import { UserLikedEvent } from '../../user-liked-events/entities/user-liked-event.entity';
class Following {
  company: Company;
  notificationsEnabled: boolean;
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  newsletter: boolean;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column({ nullable: true })
  wallet_address: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => UserLikedEvent, (userLikedEvent) => userLikedEvent.user)
  liked: Event[];

  @OneToMany(() => UserCompanyFollowing, (following) => following.user)
  following: UserCompanyFollowing[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
