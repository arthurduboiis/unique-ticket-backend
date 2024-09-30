import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyFollowingController } from './user-company-following.controller';
import { UserCompanyFollowingService } from './user-company-following.service';

describe('UserCompanyFollowingController', () => {
  let controller: UserCompanyFollowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCompanyFollowingController],
      providers: [UserCompanyFollowingService],
    }).compile();

    controller = module.get<UserCompanyFollowingController>(UserCompanyFollowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
