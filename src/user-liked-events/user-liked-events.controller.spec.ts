// user-liked-events.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserLikedEventsController } from './user-liked-events.controller';
import { UserLikedEventsService } from './user-liked-events.service';
import { UserLikedEvent } from './entities/user-liked-event.entity'; // Import necessary for types
import { Company } from 'src/companies/entities/company.entity';

describe('UserLikedEventsController', () => {
  let controller: UserLikedEventsController;
  let service: UserLikedEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLikedEventsController],
      providers: [
        {
          provide: UserLikedEventsService,
          useValue: {
            addLikedEvent: jest.fn(),
            removeLikedEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserLikedEventsController>(
      UserLikedEventsController
    );
    service = module.get<UserLikedEventsService>(UserLikedEventsService);
  });
  describe('tobedefined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
