import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersMemberOfCompaniesController } from './crm-users-member-of-companies.controller';
import { CrmUsersMemberOfCompaniesService } from './crm-users-member-of-companies.service';

describe('CrmUsersMemberOfCompaniesController', () => {
  let controller: CrmUsersMemberOfCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrmUsersMemberOfCompaniesController],
      providers: [CrmUsersMemberOfCompaniesService],
    }).compile();

    controller = module.get<CrmUsersMemberOfCompaniesController>(CrmUsersMemberOfCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
