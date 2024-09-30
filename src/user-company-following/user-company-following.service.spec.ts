import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyFollowingService } from './user-company-following.service';

describe('UserCompanyFollowingService', () => {
  let service: UserCompanyFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCompanyFollowingService],
    }).compile();

    service = module.get<UserCompanyFollowingService>(UserCompanyFollowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
