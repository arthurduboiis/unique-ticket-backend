import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CrmUser } from 'src/crm_users/entities/crm_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CrmUser])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
