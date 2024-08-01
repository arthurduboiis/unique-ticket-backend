import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../events/event.entity';
import { CrmUser } from '../crm-users/crm-user.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('jsonb')
  companyLogo: {
    name: string;
    url: string;
  };

  @Column()
  primaryColor: string;

  @Column()
  accountSubscriptionStatus: string;

  @Column()
  stripeAccountId: string;

  @OneToMany(() => Event, (event) => event.company)
  events: Event[];

  @OneToMany(() => CrmUser, (crmUser) => crmUser.company)
  members: CrmUser[];
}
