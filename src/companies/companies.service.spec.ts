import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CrmUser } from '../crm_users/entities/crm_user.entity';
import { CrmUsersMemberOfCompany } from '../crm-users-member-of-companies/entities/crm-users-member-of-company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NotFoundException } from '@nestjs/common';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let companyRepository: Repository<Company>;
  let crmUserRepository: Repository<CrmUser>;
  let crmUsersMemberOfCompanyRepository: Repository<CrmUsersMemberOfCompany>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CrmUser),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CrmUsersMemberOfCompany),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company)
    );
    crmUserRepository = module.get<Repository<CrmUser>>(
      getRepositoryToken(CrmUser)
    );
    crmUsersMemberOfCompanyRepository = module.get<
      Repository<CrmUsersMemberOfCompany>
    >(getRepositoryToken(CrmUsersMemberOfCompany));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company and link the creator', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        creatorId: 1,
      };
  
      const creator = { id: 1 } as CrmUser;
      const createdCompany = {
        id: 1,
        ...createCompanyDto,
        events: [],
        members: [],
        followers: [],
        reports: [],
      } as Company;
  
      // Mock des méthodes des repositories
      jest.spyOn(crmUserRepository, 'findOne').mockResolvedValue(creator);
      jest.spyOn(companyRepository, 'create').mockReturnValue(createdCompany); // Correct mocking
      jest.spyOn(companyRepository, 'save').mockResolvedValue(createdCompany);
      jest.spyOn(crmUsersMemberOfCompanyRepository, 'create').mockReturnValue({
        crmUser: creator,
        company: createdCompany,
        accessLevel: 'admin',
        permissions: ['all'],
      } as CrmUsersMemberOfCompany); // Mock de la méthode create pour la jointure
      jest.spyOn(crmUsersMemberOfCompanyRepository, 'save').mockResolvedValue(null);  // Pas besoin du retour réel ici
  
      const result = await service.create(createCompanyDto);
  
      // Vérification que tout fonctionne comme prévu
      expect(result).toEqual(createdCompany);
      expect(crmUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: createCompanyDto.creatorId },
      });
      expect(companyRepository.create).toHaveBeenCalledWith({
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
      });
      expect(companyRepository.save).toHaveBeenCalledWith(createdCompany);
      expect(crmUsersMemberOfCompanyRepository.create).toHaveBeenCalledWith({
        crmUser: creator,
        company: createdCompany,
        accessLevel: 'admin',
        permissions: ['all'],
      });
      expect(crmUsersMemberOfCompanyRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          crmUser: creator,
          company: createdCompany,
          accessLevel: 'admin',
          permissions: ['all'],
        }),
      );
    });
  });
 

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const companies = [
        {
          id: 1,
          name: 'Test Company',
          companyLogo: { name: 'logo', url: 'url' },
          primaryColor: '#FFFFFF',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_1234',
          events: [],
          members: [],
          followers: [],
          reports: [],
        },
      ];

      jest.spyOn(companyRepository, 'find').mockResolvedValue(companies);

      const result = await service.findAll();
      expect(result).toEqual(companies);
      expect(companyRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a company if found', async () => {
      const company = {
        id: 1,
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company);

      const result = await service.findOne(1);
      expect(result).toEqual(company);
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if the company is not found', async () => {
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateCompanyDto: UpdateCompanyDto = { name: 'Updated Company' };

      const company = {
        id: 1,
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };

      const updatedCompany = { ...company, ...updateCompanyDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(company);
      jest.spyOn(companyRepository, 'save').mockResolvedValue(updatedCompany);

      const result = await service.update(1, updateCompanyDto);

      expect(result).toEqual(updatedCompany);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(companyRepository.save).toHaveBeenCalledWith(updatedCompany);
    });
  });

  describe('remove', () => {
    it('should remove a company and its relations', async () => {
      const company = {
        id: 1,
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };
  
      // Mock des méthodes du service et des repositories
      jest.spyOn(service, 'findOne').mockResolvedValue(company);  // Mock du service findOne
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company); // Mock pour findOne du repository
      jest.spyOn(crmUsersMemberOfCompanyRepository, 'delete').mockResolvedValue(null);  // Mock de la suppression des relations
      jest.spyOn(companyRepository, 'remove').mockResolvedValue(company);  // Mock de la suppression de la société
  
      const result = await service.remove(1);  // Appel de la méthode remove
  
      expect(result).toEqual(company);  // Le résultat devrait être la société supprimée
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(crmUsersMemberOfCompanyRepository.delete).toHaveBeenCalledWith({
        company: { id: 1 },
      });
      expect(companyRepository.remove).toHaveBeenCalledWith(company);  // Vérifie que la société est bien supprimée
    });
  });
  
  
});
