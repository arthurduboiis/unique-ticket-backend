import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyFollowingService } from './user-company-following.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCompanyFollowing } from './entities/user-company-following.entity';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
import { Repository, DeleteResult } from 'typeorm';

describe('UserCompanyFollowingService', () => {
  let service: UserCompanyFollowingService;
  let userCompanyFollowingRepository: Repository<UserCompanyFollowing>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCompanyFollowingService,
        {
          provide: getRepositoryToken(UserCompanyFollowing),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserCompanyFollowingService>(
      UserCompanyFollowingService
    );
    userCompanyFollowingRepository = module.get<
      Repository<UserCompanyFollowing>
    >(getRepositoryToken(UserCompanyFollowing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test : followCompany
  describe('followCompany', () => {
    it('should follow a company', async () => {
      const createUserCompanyFollowingDto = {
        userId: 1,
        companyId: 1,
        notificationsEnabled: true,
      };

      const savedUserCompanyFollowing: UserCompanyFollowing = {
        id: 1,
        ...createUserCompanyFollowingDto,
      } as unknown as UserCompanyFollowing;

      jest
        .spyOn(userCompanyFollowingRepository, 'create')
        .mockReturnValue(savedUserCompanyFollowing);
      jest
        .spyOn(userCompanyFollowingRepository, 'save')
        .mockResolvedValue(savedUserCompanyFollowing);

      const result = await service.followCompany(createUserCompanyFollowingDto);

      expect(result).toEqual(savedUserCompanyFollowing);
      expect(userCompanyFollowingRepository.create).toHaveBeenCalledWith(
        createUserCompanyFollowingDto
      );
      expect(userCompanyFollowingRepository.save).toHaveBeenCalledWith(
        savedUserCompanyFollowing
      );
    });
  });

  describe('updateNotifications', () => {
    it('should update notifications', async () => {
      const updateUserCompanyFollowingDto = { notificationsEnabled: false };

      const userCompanyFollowing: UserCompanyFollowing = {
        id: 1,
        user: { id: 1 } as User,
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: 'http://example.com/logo.png',
          primaryColor: '#FFFFFF',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_123',
          stripeCustomerId: 'cus_123',
          reports: [],
          created_at: new Date(),
          updated_at: new Date(),
        } as unknown as Company,
        notificationsEnabled: true,
      };

      const updatedUserCompanyFollowing: UserCompanyFollowing = {
        ...userCompanyFollowing,
        notificationsEnabled: false,
      };

      jest
        .spyOn(service, 'getFollowingCompanies')
        .mockResolvedValue([userCompanyFollowing]);
      jest
        .spyOn(userCompanyFollowingRepository, 'save')
        .mockResolvedValue(updatedUserCompanyFollowing);

      const result = await service.updateNotifications(
        1,
        1,
        updateUserCompanyFollowingDto
      );

      expect(result).toEqual(updatedUserCompanyFollowing);
      expect(service.getFollowingCompanies).toHaveBeenCalledWith(1);
      expect(userCompanyFollowingRepository.save).toHaveBeenCalledWith({
        ...userCompanyFollowing,
        notificationsEnabled: false,
      });
    });
  });

  // Test : unfollowCompany
  describe('unfollowCompany', () => {
    it('should unfollow a company', async () => {
      const deleteResult: DeleteResult = { affected: 1 } as DeleteResult;

      jest
        .spyOn(userCompanyFollowingRepository, 'delete')
        .mockResolvedValue(deleteResult);

      const result = await service.unfollowCompany(1, 1);

      expect(result).toEqual({ deleted: true });
      expect(userCompanyFollowingRepository.delete).toHaveBeenCalledWith({
        user: { id: 1 },
        company: { id: 1 },
      });
    });
  });

  // Test : getFollowingCompanies
  describe('getFollowingCompanies', () => {
    it('should return companies followed by user', async () => {
      const userCompanyFollowings: UserCompanyFollowing[] = [
        {
          id: 1,
          user: { id: 1 } as User,
          company: { id: 1, name: 'Company 1' } as Company,
          notificationsEnabled: true,
        },
      ];

      jest
        .spyOn(userCompanyFollowingRepository, 'find')
        .mockResolvedValue(userCompanyFollowings);

      const result = await service.getFollowingCompanies(1);

      expect(result).toEqual(userCompanyFollowings);
      expect(userCompanyFollowingRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        relations: ['company'],
      });
    });
  });
});
