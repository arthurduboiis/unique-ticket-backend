import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
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

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a report', async () => {
      const createReportDto: CreateReportDto = {
        name: 'Annual Report',
        description: 'Detailed yearly performance',
        date: new Date(),
        companyId: 1,
      };

      const result = {
        id: 1,
        name: 'Annual Report',
        description: 'Detailed yearly performance',
        date: new Date(),
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: {
            name: 'company-logo.png',
            url: 'https://example.com/logo.png',
          },
          primaryColor: '#000000',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_1234',
          events: [], // Relation avec les événements
          members: [], // Relation avec les membres
          followers: [], // Relation avec les followers
          reports: [], // Relation avec les rapports
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createReportDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createReportDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = [
        {
          id: 1,
          name: 'Report 1',
          description: 'Description for Report 1',
          date: new Date(),
          company: {
            id: 1,
            name: 'Company 1',
            companyLogo: {
              name: 'company-logo.png',
              url: 'https://example.com/logo.png',
            },
            primaryColor: '#000000',
            accountSubscriptionStatus: 'active',
            stripeAccountId: 'acct_1234',
            events: [],
            members: [],
            followers: [],
            reports: [],
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(reports);

      const result = await controller.findAll();

      expect(result).toEqual(reports);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a report by id', async () => {
      const report = {
        id: 1,
        name: 'Report 1',
        description: 'Description for Report 1',
        date: new Date(),
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: {
            name: 'company-logo.png',
            url: 'https://example.com/logo.png',
          },
          primaryColor: '#000000',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_1234',
          events: [],
          members: [],
          followers: [],
          reports: [],
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(report);

      const result = await controller.findOne('1');

      expect(result).toEqual(report);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the report is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(
        new Error('Report with ID 1 not found')
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a report', async () => {
      const updateReportDto = { name: 'Updated Report Name' };

      const updatedReport = {
        id: 1,
        name: 'Updated Report Name',
        description: 'Description for Report 1',
        date: new Date(),
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: {
            name: 'company-logo.png',
            url: 'https://example.com/logo.png',
          },
          primaryColor: '#000000',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_1234',
          events: [],
          members: [],
          followers: [],
          reports: [],
        },
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedReport);

      const result = await controller.update('1', updateReportDto);

      expect(result).toEqual(updatedReport);
      expect(service.update).toHaveBeenCalledWith(1, updateReportDto);
    });
  });

  describe('remove', () => {
    it('should remove a report by id', async () => {
      const report = {
        id: 1,
        name: 'Report 1',
        description: 'Description for Report 1',
        date: new Date(),
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: {
            name: 'company-logo.png',
            url: 'https://example.com/logo.png',
          },
          primaryColor: '#000000',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_1234',
          events: [],
          members: [],
          followers: [],
          reports: [],
        },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(report);

      const result = await controller.remove('1');

      expect(result).toEqual(report);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
