import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersMemberOfCompaniesController } from './crm-users-member-of-companies.controller';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';

describe('CrmUsersMemberOfCompaniesController', () => {
  let controller: CrmUsersMemberOfCompaniesController;
  let service: CrmUsersMemberOfCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrmUsersMemberOfCompaniesController],
      providers: [
        {
          provide: CrmUsersMemberOfCompaniesService,
          useValue: {
            addUserToCompany: jest.fn(),
            removeUserFromCompany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CrmUsersMemberOfCompaniesController>(
      CrmUsersMemberOfCompaniesController
    );
    service = module.get<CrmUsersMemberOfCompaniesService>(
      CrmUsersMemberOfCompaniesService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addUserToCompany', () => {
    it('should call addUserToCompany service with correct parameters', async () => {
      const crmUserId = 1;
      const companyId = 1;

      jest.spyOn(service, 'addUserToCompany').mockResolvedValue(undefined); // Ici, la fonction ne retourne rien

      const response = await controller.addUserToCompany(crmUserId, companyId);

      expect(response).toBeUndefined(); // La fonction ne retourne rien, on vérifie que c'est undefined
      expect(service.addUserToCompany).toHaveBeenCalledWith(
        crmUserId,
        companyId
      );
    });
  });

  describe('removeUserFromCompany', () => {
    it('should call removeUserFromCompany service with correct parameters', async () => {
      const crmUserId = 1;
      const companyId = 1;

      jest.spyOn(service, 'removeUserFromCompany').mockResolvedValue(undefined); // Même chose, pas de valeur de retour

      const response = await controller.removeUserFromCompany(
        crmUserId,
        companyId
      );

      expect(response).toBeUndefined(); // On vérifie que la réponse est undefined
      expect(service.removeUserFromCompany).toHaveBeenCalledWith(
        crmUserId,
        companyId
      );
    });
  });
});
