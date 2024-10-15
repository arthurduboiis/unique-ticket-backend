import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { Company } from '../companies/entities/company.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

describe('ReportsService', () => {
  let service: ReportsService;
  let reportRepository: Repository<Report>;
  let companyRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    reportRepository = module.get<Repository<Report>>(
      getRepositoryToken(Report)
    );
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a report', async () => {
      const createReportDto: CreateReportDto = {
        name: 'Monthly Report',
        description: 'This is a monthly report',
        date: new Date('2024-10-15'),
        companyId: 1,
      };

      const company = { id: 1, name: 'Company 1' } as Company;

      const savedReport = {
        id: 1,
        ...createReportDto,
        company,
      } as Report;

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company);
      jest.spyOn(reportRepository, 'create').mockReturnValue(savedReport);
      jest.spyOn(reportRepository, 'save').mockResolvedValue(savedReport);

      const result = await service.create(createReportDto);

      expect(result).toEqual(savedReport);
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(reportRepository.create).toHaveBeenCalledWith({
        name: 'Monthly Report',
        description: 'This is a monthly report',
        date: new Date('2024-10-15'),
        company: {
          id: 1,
          name: 'Company 1',
        },
      });
      expect(reportRepository.save).toHaveBeenCalledWith(savedReport);
    });

    it('should throw an error if company not found', async () => {
      const createReportDto: CreateReportDto = {
        name: 'Monthly Report',
        description: 'This is a monthly report',
        date: new Date('2024-10-15'),
        companyId: 1,
      };

      // Simuler que la société n'est pas trouvée
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

      // Vérifier que l'exception est levée
      await expect(service.create(createReportDto)).rejects.toThrow(
        'Company not found'
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = [
        {
          id: 1,
          name: 'Report 1',
          description: 'Description 1',
          date: new Date(),
          company: { id: 1, name: 'Company 1' },
        },
      ] as Report[];

      jest.spyOn(reportRepository, 'find').mockResolvedValue(reports);

      const result = await service.findAll();

      expect(result).toEqual(reports);
      expect(reportRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a report by id', async () => {
      const report = {
        id: 1,
        name: 'Report 1',
        description: 'Description 1',
        date: new Date(),
        company: { id: 1, name: 'Company 1' },
      } as Report;

      jest.spyOn(reportRepository, 'findOne').mockResolvedValue(report);

      const result = await service.findOne(1);

      expect(result).toEqual(report);
      expect(reportRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if report not found', async () => {
      // Simuler que le rapport n'est pas trouvé (renvoyer null)
      jest.spyOn(reportRepository, 'findOne').mockResolvedValue(null);

      // Vérifier que le service lève une exception NotFoundException
      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Report with ID 1 not found')
      );
    });
  });

  describe('update', () => {
    it('should update a report', async () => {
      const updateReportDto: UpdateReportDto = {
        name: 'Updated Report',
      };

      const report = {
        id: 1,
        name: 'Report 1',
        description: 'Description 1',
        date: new Date(),
        company: { id: 1, name: 'Company 1' },
      } as Report;

      const updatedReport = {
        ...report,
        ...updateReportDto,
      } as Report;

      jest.spyOn(service, 'findOne').mockResolvedValue(report);
      jest.spyOn(reportRepository, 'save').mockResolvedValue(updatedReport);

      const result = await service.update(1, updateReportDto);

      expect(result).toEqual(updatedReport);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(reportRepository.save).toHaveBeenCalledWith(updatedReport);
    });
  });

  describe('remove', () => {
    it('should remove a report by id', async () => {
      const report = {
        id: 1,
        name: 'Report 1',
        description: 'Description 1',
        date: new Date(),
        company: { id: 1, name: 'Company 1' },
      } as Report;

      jest.spyOn(reportRepository, 'findOne').mockResolvedValue(report);
      jest.spyOn(reportRepository, 'delete').mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual(report);
      expect(reportRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(reportRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if report not found', async () => {
      jest.spyOn(reportRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        'Report with ID 1 not found'
      );
    });
  });
});
