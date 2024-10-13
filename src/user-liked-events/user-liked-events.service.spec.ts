import { Test, TestingModule } from '@nestjs/testing';
import { UserLikedEventsService } from './user-liked-events.service';

describe('UserLikedEventsService', () => {
  let service: UserLikedEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLikedEventsService],
    }).compile();

    service = module.get<UserLikedEventsService>(UserLikedEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
