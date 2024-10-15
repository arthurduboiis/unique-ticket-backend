import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmUsersMemberOfCompany } from './entities/crm-users-member-of-company.entity';

describe('CrmUsersMemberOfCompaniesService', () => {
  let service: CrmUsersMemberOfCompaniesService;
  let repository: Repository<CrmUsersMemberOfCompany>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrmUsersMemberOfCompaniesService,
        {
          provide: getRepositoryToken(CrmUsersMemberOfCompany),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CrmUsersMemberOfCompaniesService>(
      CrmUsersMemberOfCompaniesService
    );
    repository = module.get<Repository<CrmUsersMemberOfCompany>>(
      getRepositoryToken(CrmUsersMemberOfCompany)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addUserToCompany', () => {
    it('should add a user to a company', async () => {
      const crmUserId = 1;
      const companyId = 1;

      const memberOfCompany = {
        crmUser: { id: crmUserId },
        company: { id: companyId },
      } as CrmUsersMemberOfCompany;

      jest.spyOn(repository, 'create').mockReturnValue(memberOfCompany);
      jest.spyOn(repository, 'save').mockResolvedValue(memberOfCompany);

      const result = await service.addUserToCompany(crmUserId, companyId);

      expect(result).toEqual(memberOfCompany);
      expect(repository.create).toHaveBeenCalledWith({
        crmUser: { id: crmUserId },
        company: { id: companyId },
      });
      expect(repository.save).toHaveBeenCalledWith(memberOfCompany);
    });
  });

  describe('removeUserFromCompany', () => {
    it('should remove a user from a company', async () => {
      const crmUserId = 1;
      const companyId = 1;

      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      const result = await service.removeUserFromCompany(crmUserId, companyId);

      expect(result).toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith({
        crmUser: { id: crmUserId },
        company: { id: companyId },
      });
    });
  });
});
