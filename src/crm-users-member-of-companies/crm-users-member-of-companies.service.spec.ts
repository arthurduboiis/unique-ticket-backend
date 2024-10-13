import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';

describe('CrmUsersMemberOfCompaniesService', () => {
  let service: CrmUsersMemberOfCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrmUsersMemberOfCompaniesService],
    }).compile();

    service = module.get<CrmUsersMemberOfCompaniesService>(CrmUsersMemberOfCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
