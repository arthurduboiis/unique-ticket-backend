import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './company.entity';
import { Event } from '../events/event.entity';
import { CrmUser } from '../crm-users/crm-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Event, CrmUser])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
