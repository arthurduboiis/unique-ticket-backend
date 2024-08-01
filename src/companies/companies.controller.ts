import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { Event } from '../events/event.entity';
import { CrmUser } from '../crm-users/crm-user.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Post()
  create(@Body() company: Company): Promise<Company> {
    return this.companiesService.create(company);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.companiesService.remove(id);
  }

  @Get(':id/events')
  findEventsByCompanyId(@Param('id') id: number): Promise<Event[]> {
    return this.companiesService.findEventsByCompanyId(id);
  }

  @Get(':id/members')
  findMembersByCompanyId(@Param('id') id: number): Promise<CrmUser[]> {
    return this.companiesService.findMembersByCompanyId(id);
  }
}
