import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { Company } from '../companies/entities/company.entity';
import { In } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const { companyId, ...reportData } = createReportDto;

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new Error('Company not found');
    }
    const report = this.reportRepository.create({ ...reportData, company });
    const savedReport = await this.reportRepository.save(report);
    return savedReport;
  }

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.find();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);
    Object.assign(report, updateReportDto);
    return await this.reportRepository.save(report);
  }

  async remove(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    await this.reportRepository.delete(id);
    return report;
  }
}
