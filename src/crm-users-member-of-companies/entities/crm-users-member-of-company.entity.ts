import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { CrmUser } from '../../crm_users/entities/crm_user.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('crm_users_member_of_companies')
export class CrmUsersMemberOfCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CrmUser, (crmUser) => crmUser.companies, {
    onDelete: 'SET NULL',
  })
  crmUser: CrmUser;

  @ManyToOne(() => Company, (company) => company.members, {
    onDelete: 'SET NULL',
  })
  company: Company;

  // Nouveau champ : Niveau d'accès pour cet utilisateur dans cette entreprise
  @Column({ nullable: true })
  accessLevel: string;

  // Nouveau champ : Permissions pour cet utilisateur dans cette entreprise
  @Column('jsonb', { nullable: true })
  permissions: string[];
}
