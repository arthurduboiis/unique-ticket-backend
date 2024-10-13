import { Test, TestingModule } from '@nestjs/testing';
import { UserLikedEventsController } from './user-liked-events.controller';
import { UserLikedEventsService } from './user-liked-events.service';

describe('UserLikedEventsController', () => {
  let controller: UserLikedEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLikedEventsController],
      providers: [UserLikedEventsService],
    }).compile();

    controller = module.get<UserLikedEventsController>(UserLikedEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
