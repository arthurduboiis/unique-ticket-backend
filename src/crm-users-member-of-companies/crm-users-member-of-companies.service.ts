import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmUsersMemberOfCompany } from './entities/crm-users-member-of-company.entity';
import { CrmUser } from '../crm_users/entities/crm_user.entity';

@Injectable()
export class CrmUsersMemberOfCompaniesService {
  constructor(
    @InjectRepository(CrmUsersMemberOfCompany)
    private readonly crmUsersMemberOfCompaniesRepository: Repository<CrmUsersMemberOfCompany>,
  ) { }

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

  // Récupérer les utilisateurs pour une entreprise donnée
  async getUsersByCompany(companyId: number) {
    return this.crmUsersMemberOfCompaniesRepository.find({
      where: { company: { id: companyId } },
      relations: ['crmUser'], // Charger les détails des utilisateurs associés
    }).then(members => members.map(member => member.crmUser));
  }
}
