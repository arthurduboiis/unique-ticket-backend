import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersController } from './crm_users.controller';
import { CrmUsersService } from './crm_users.service';

describe('CrmUsersController', () => {
  let controller: CrmUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrmUsersController],
      providers: [CrmUsersService],
    }).compile();

    controller = module.get<CrmUsersController>(CrmUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
