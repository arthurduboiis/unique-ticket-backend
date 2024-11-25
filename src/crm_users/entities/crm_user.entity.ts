import { CrmUsersMemberOfCompany } from '../../crm-users-member-of-companies/entities/crm-users-member-of-company.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crm_users')
export class CrmUser {
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

  @Column()
  password: string;

  @OneToMany(() => CrmUsersMemberOfCompany, (memberOf) => memberOf.crmUser)
  companies: CrmUsersMemberOfCompany[];

  @Column('jsonb', { nullable: true })
  profilePicture: {
    name: string;
    url: string;
  };

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  newsletter: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
