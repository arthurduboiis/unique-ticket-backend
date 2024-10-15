import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test for create method
  describe('create', () => {
    it('should call the create method of the service', async () => {
      const dto: CreateCompanyDto = {
        name: 'Test Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        creatorId: 1,
      };

      const createdCompany = {
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

      jest.spyOn(service, 'create').mockResolvedValue(createdCompany);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdCompany);
    });
  });

  // Test for findAll method
  describe('findAll', () => {
    it('should call the findAll method of the service', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(companies);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(companies);
    });
  });

  // Test for findOne method
  describe('findOne', () => {
    it('should call the findOne method of the service with the correct ID', async () => {
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

      jest.spyOn(service, 'findOne').mockResolvedValue(company);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(company);
    });
  });

  // Test for update method
  describe('update', () => {
    it('should call the update method of the service with the correct data', async () => {
      const dto: UpdateCompanyDto = { name: 'Updated Company' };

      const updatedCompany = {
        id: 1,
        name: 'Updated Company',
        companyLogo: { name: 'logo', url: 'url' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_1234',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCompany);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(updatedCompany);
    });
  });

  // Test for remove method
  describe('remove', () => {
    it('should call the remove method of the service with the correct ID', async () => {
      const removedCompany = {
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

      jest.spyOn(service, 'remove').mockResolvedValue(removedCompany);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removedCompany);
    });
  });
});
