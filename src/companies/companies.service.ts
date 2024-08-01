import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Event } from '../events/event.entity';
import { CrmUser } from '../crm-users/crm-user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(CrmUser)
    private readonly crmUserRepository: Repository<CrmUser>
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOneBy({ id });
  }

  async create(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async findEventsByCompanyId(companyId: number): Promise<Event[]> {
    return this.eventRepository.find({
      where: {
        company: { id: companyId },
      },
    });
  }

  async findMembersByCompanyId(companyId: number): Promise<CrmUser[]> {
    return this.crmUserRepository.find({
      where: {
        company: { id: companyId },
      },
    });
  }
}
