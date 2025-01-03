import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CrmUsersMemberOfCompany } from 'src/crm-users-member-of-companies/entities/crm-users-member-of-company.entity';
import { CrmUser } from 'src/crm_users/entities/crm_user.entity';
import { CrmUsersMemberOfCompaniesService } from '../crm-users-member-of-companies/crm-users-member-of-companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CrmUsersMemberOfCompany, CrmUser])],
  controllers: [CompaniesController],
  providers: [CompaniesService, CrmUsersMemberOfCompaniesService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
