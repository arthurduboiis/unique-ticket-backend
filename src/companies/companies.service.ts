import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CrmUser } from '../crm_users/entities/crm_user.entity';
import { CrmUsersMemberOfCompany } from '../crm-users-member-of-companies/entities/crm-users-member-of-company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CrmUser)
    private readonly crmUserRepository: Repository<CrmUser>,
    @InjectRepository(CrmUsersMemberOfCompany)
    private readonly crmUsersMemberOfCompanyRepository: Repository<CrmUsersMemberOfCompany>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { creatorId, ...companyData } = createCompanyDto;

    // Charger le membre créateur
    const creator = await this.crmUserRepository.findOne({
      where: { id: creatorId },
    });

    if (!creator) {
      throw new Error('Creator user not found');
    }

    // Créer la société
    const company = this.companyRepository.create(companyData);
    const savedCompany = await this.companyRepository.save(company);

    // Ajouter la relation dans la table de jointure
    const memberOfCompany = this.crmUsersMemberOfCompanyRepository.create({
      crmUser: creator,
      company: savedCompany,
      accessLevel: 'admin',  // Par exemple, définir un accessLevel par défaut
      permissions: ['all'], // Définir les permissions par défaut
    });

    await this.crmUsersMemberOfCompanyRepository.save(memberOfCompany);

    return savedCompany;

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

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }

  async remove(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
  
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  
    await this.crmUsersMemberOfCompanyRepository.delete({ company: { id } });
    await this.companyRepository.remove(company);
  
    return company;
  }
  
}
