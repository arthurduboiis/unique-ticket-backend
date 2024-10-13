import { Controller, Post, Delete, Param } from '@nestjs/common';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';

@Controller('crm-users-member-of-companies')
export class CrmUsersMemberOfCompaniesController {
  constructor(private readonly crmUsersMemberOfCompaniesService: CrmUsersMemberOfCompaniesService) {}

  // Route pour ajouter un utilisateur à une entreprise
  @Post(':crmUserId/:companyId')
  addUserToCompany(@Param('crmUserId') crmUserId: number, @Param('companyId') companyId: number) {
    return this.crmUsersMemberOfCompaniesService.addUserToCompany(crmUserId, companyId);
  }

  // Route pour supprimer un utilisateur d'une entreprise
  @Delete(':crmUserId/:companyId')
  removeUserFromCompany(@Param('crmUserId') crmUserId: number, @Param('companyId') companyId: number) {
    return this.crmUsersMemberOfCompaniesService.removeUserFromCompany(crmUserId, companyId);
  }
}
