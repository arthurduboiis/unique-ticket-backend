import { Module } from '@nestjs/common';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';
import { CrmUsersMemberOfCompaniesController } from './crm-users-member-of-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUsersMemberOfCompany } from './entities/crm-users-member-of-company.entity';
import { CrmUser } from 'src/crm_users/entities/crm_user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrmUsersMemberOfCompany, CrmUser, Company])],
  controllers: [CrmUsersMemberOfCompaniesController],
  providers: [CrmUsersMemberOfCompaniesService],
})
export class CrmUsersMemberOfCompaniesModule {}
