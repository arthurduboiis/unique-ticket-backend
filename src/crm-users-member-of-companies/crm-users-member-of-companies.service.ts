import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmUsersMemberOfCompany } from './entities/crm-users-member-of-company.entity';

@Injectable()
export class CrmUsersMemberOfCompaniesService {
  constructor(
    @InjectRepository(CrmUsersMemberOfCompany)
    private readonly crmUsersMemberOfCompaniesRepository: Repository<CrmUsersMemberOfCompany>,
  ) {}

  // Ajouter un utilisateur à une entreprise
  async addUserToCompany(crmUserId: number, companyId: number): Promise<CrmUsersMemberOfCompany> {
    const memberOf = this.crmUsersMemberOfCompaniesRepository.create({
      crmUser: { id: crmUserId }, // On utilise les IDs pour référencer les utilisateurs et entreprises
      company: { id: companyId },
    });
    return this.crmUsersMemberOfCompaniesRepository.save(memberOf);
  }

  // Supprimer un utilisateur d'une entreprise
  async removeUserFromCompany(crmUserId: number, companyId: number): Promise<void> {
    await this.crmUsersMemberOfCompaniesRepository.delete({
      crmUser: { id: crmUserId },
      company: { id: companyId },
    });
  }
}
