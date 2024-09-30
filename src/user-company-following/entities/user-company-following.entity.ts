import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('user_company_following')
export class UserCompanyFollowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.following)
  user: User;

  @ManyToOne(() => Company, (company) => company.followers)
  company: Company;

  @Column({ default: false })
  notificationsEnabled: boolean;
}

