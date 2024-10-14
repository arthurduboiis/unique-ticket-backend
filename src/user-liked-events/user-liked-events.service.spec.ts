// user-liked-events.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserLikedEventsService } from './user-liked-events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikedEvent } from './entities/user-liked-event.entity';
import { Company } from 'src/companies/entities/company.entity';

describe('UserLikedEventsService', () => {
  let service: UserLikedEventsService;
  let repository: Repository<UserLikedEvent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserLikedEventsService,
        {
          provide: getRepositoryToken(UserLikedEvent),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserLikedEventsService>(UserLikedEventsService);
    repository = module.get<Repository<UserLikedEvent>>(
      getRepositoryToken(UserLikedEvent)
    );
  });

  describe('addLikedEvent', () => {
    it('should add a liked event for the user', async () => {
      const userId = 1;
      const eventId = 100;
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

      jest.spyOn(repository, 'create').mockReturnValue(likedEvent as any);
      jest.spyOn(repository, 'save').mockResolvedValue(likedEvent as any);

      const result = await service.addLikedEvent(userId, eventId);

      expect(repository.create).toHaveBeenCalledWith({
        user: { id: userId },
        event: { id: eventId },
      });
      expect(repository.save).toHaveBeenCalledWith(likedEvent);
      expect(result).toEqual(likedEvent);
    });
  });

  describe('removeLikedEvent', () => {
    it('should remove a liked event for the user', async () => {
      const userId = 1;
      const eventId = 100;

      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.removeLikedEvent(userId, eventId);

      expect(repository.delete).toHaveBeenCalledWith({
        user: { id: userId },
        event: { id: eventId },
      });
    });
  });
});
