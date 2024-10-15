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

  describe('addLikedEvent', () => {
    it('should call addLikedEvent from the service', async () => {
      const userId = 1;
      const eventId = 100;
      const dto = { userId, eventId };

      // Use Partial<UserLikedEvent> to allow a partial mock of the entity
      const likedEvent: Partial<UserLikedEvent> = {
        id: 1,
        user: {
          id: userId,
          firstname: '',
          lastname: '',
          phoneNumber: '',
          email: '',
          newsletter: false,
          region: '',
          gender: '',
          birthdate: '',
          wallet_address: '',
          tickets: [],
          liked: [],
          following: [],
          created_at: undefined,
          updated_at: undefined,
        },
        event: {
          id: eventId,
          artist: [],
          title: '',
          description: '',
          capacity: 0,
          city: '',
          contractAddress: '',
          coOrganizer: '',
          likes: [],
          mood: '',
          startDate: undefined,
          endDate: undefined,
          eventType: '',
          image: '',
          place: '',
          startingPrice: 0,
          ticketCategories: [],
          company: new Company(),
          tickets: [],
          created_at: undefined,
          updated_at: undefined,
        },
      };

      jest
        .spyOn(service, 'addLikedEvent')
        .mockResolvedValue(likedEvent as UserLikedEvent);

      // Assuming you have a corresponding controller method
      const result = await controller.addLikedEvent(dto);

      expect(service.addLikedEvent).toHaveBeenCalledWith(userId, eventId);
      expect(result).toEqual(likedEvent);
    });
  });

  describe('removeLikedEvent', () => {
    it('should call removeLikedEvent from the service', async () => {
      const userId = 1;
      const eventId = 100;

      await controller.removeLikedEvent(userId, eventId);

      expect(service.removeLikedEvent).toHaveBeenCalledWith(userId, eventId);
    });
  });
});
