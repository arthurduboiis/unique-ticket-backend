import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CrmUser } from '../crm_users/entities/crm_user.entity';
import { CrmUsersMemberOfCompany } from '../crm-users-member-of-companies/entities/crm-users-member-of-company.entity';
import { NotFoundException } from '@nestjs/common';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let companyRepository: jest.Mocked<Repository<Company>>;
  let crmUserRepository: jest.Mocked<Repository<CrmUser>>;
  let crmUsersMemberOfCompanyRepository: jest.Mocked<Repository<CrmUsersMemberOfCompany>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CrmUser),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CrmUsersMemberOfCompany),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    companyRepository = module.get(getRepositoryToken(Company));
    crmUserRepository = module.get(getRepositoryToken(CrmUser));
    crmUsersMemberOfCompanyRepository = module.get(getRepositoryToken(CrmUsersMemberOfCompany));
  });

  describe('CompaniesService - create', () => {
    let createCompanyDto: any;
    let savedCompany: any;
    let mockCreator: CrmUser;
    let mockMemberOfCompany: CrmUsersMemberOfCompany;
  
    beforeEach(() => {
      // Données pour la création de la compagnie
      createCompanyDto = {
        name: 'New Company',
        companyLogo: { name: 'logo.png', url: 'http://example.com/logo.png' },
        primaryColor: '#FF5733',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234567890abcdef',
        creatorId: 1,  // Utilisé uniquement pour la création
      };
  
      // Données du créateur
      mockCreator = { id: 1, firstname: 'John', lastname: 'Doe' } as CrmUser;
  
      // Compagnie simulée sauvegardée
      savedCompany = {
        id: 1,
        name: 'New Company',
        companyLogo: { name: 'logo.png', url: 'http://example.com/logo.png' },
        primaryColor: '#FF5733',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234567890abcdef',
      };
  
      // Membre de la compagnie simulé
      mockMemberOfCompany = {
        crmUser: mockCreator,
        company: { id: 1 } as Company,
        accessLevel: 'admin',
        permissions: ['all'],
      } as CrmUsersMemberOfCompany;
    });
  
    it('should create a new company and add the creator as a member', async () => {
      // Simuler la récupération du créateur
      crmUserRepository.findOne.mockResolvedValue(mockCreator);
      
      // Simuler la création et la sauvegarde de la compagnie sans `creatorId`
      companyRepository.create.mockReturnValue(savedCompany as any);
      companyRepository.save.mockResolvedValue(savedCompany as any);
  
      // Simuler la création et la sauvegarde dans `CrmUsersMemberOfCompany`
      crmUsersMemberOfCompanyRepository.create.mockReturnValue(mockMemberOfCompany);
      crmUsersMemberOfCompanyRepository.save.mockResolvedValue(mockMemberOfCompany);
  
      // Appeler la méthode create du service
      const result = await service.create(createCompanyDto);
  
      // Vérifier que le résultat ne contient pas `creatorId`
      expect(result).toEqual(savedCompany);
  
      // Vérifier que les méthodes ont été appelées correctement
      expect(crmUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(companyRepository.create).toHaveBeenCalledWith({
        name: 'New Company',
        companyLogo: { name: 'logo.png', url: 'http://example.com/logo.png' },
        primaryColor: '#FF5733',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234567890abcdef',
      });
      expect(companyRepository.save).toHaveBeenCalledWith(savedCompany);
      expect(crmUsersMemberOfCompanyRepository.create).toHaveBeenCalledWith({
        crmUser: mockCreator,
        company: savedCompany,
        accessLevel: 'admin',
        permissions: ['all'],
      });
      expect(crmUsersMemberOfCompanyRepository.save).toHaveBeenCalledWith(mockMemberOfCompany);
    });
  });
  

  describe('remove', () => {
    it('should delete a company and return it', async () => {
      const company = { id: 1, name: 'Company A' } as Company;

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company); // Correct the findOne mock
      jest.spyOn(crmUsersMemberOfCompanyRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(companyRepository, 'remove').mockResolvedValue(company);

      const result = await service.remove(1);

      expect(result).toEqual(company);
      expect(crmUsersMemberOfCompanyRepository.delete).toHaveBeenCalledWith({ company: { id: 1 } });
      expect(companyRepository.remove).toHaveBeenCalledWith(company);
    });

    it('should throw NotFoundException if company is not found', async () => {
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(undefined); // Mocking findOne to return undefined

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
