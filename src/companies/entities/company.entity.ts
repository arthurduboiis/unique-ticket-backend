import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Report } from '../../reports/entities/report.entity';
import { UserCompanyFollowing } from '../../user-company-following/entities/user-company-following.entity';
import { CrmUsersMemberOfCompany } from '../../crm-users-member-of-companies/entities/crm-users-member-of-company.entity';

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

  @OneToMany(() => CrmUsersMemberOfCompany, (memberOf) => memberOf.company)
  members: CrmUsersMemberOfCompany[];

  @OneToMany(() => UserCompanyFollowing, (following) => following.company)
  followers: UserCompanyFollowing[];

  @OneToMany(() => Report, (report) => report.company)
  reports: Report[];
}
