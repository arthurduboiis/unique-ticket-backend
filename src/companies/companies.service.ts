import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CrmUser } from 'src/crm_users/entities/crm_user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CrmUser)
    private readonly crmUserRepository: Repository<CrmUser>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, creatorId: number): Promise<Company> {
    const creator = await this.crmUserRepository.findOne({ where: { id: creatorId } });

    if (!creator) {
      throw new Error('Creator user not found'); 
    }

    const company = this.companyRepository.create({
      ...createCompanyDto,
      members: [creator], 
    });

    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }

  async remove(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    await this.companyRepository.delete(id);
    return company;
  }
}
