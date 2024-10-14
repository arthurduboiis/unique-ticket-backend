import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyFollowingController } from './user-company-following.controller';
import { UserCompanyFollowingService } from './user-company-following.service';
import { CreateUserCompanyFollowingDto } from './dto/create-user-company-following.dto';
import { UpdateUserCompanyFollowingDto } from './dto/update-user-company-following.dto';
import { UserCompanyFollowing } from './entities/user-company-following.entity';
import { UpdateResult } from 'typeorm';

describe('UserCompanyFollowingController', () => {
  let controller: UserCompanyFollowingController;
  let service: UserCompanyFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCompanyFollowingController],
      providers: [
        {
          provide: UserCompanyFollowingService,
          useValue: {
            followCompany: jest.fn(),
            updateNotifications: jest.fn(),
            unfollowCompany: jest.fn(),
            getFollowingCompanies: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserCompanyFollowingController>(
      UserCompanyFollowingController
    );
    service = module.get<UserCompanyFollowingService>(
      UserCompanyFollowingService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test : Follow Company
  describe('followCompany', () => {
    it('should follow a company', async () => {
      const createUserCompanyFollowingDto: CreateUserCompanyFollowingDto = {
        userId: 1,
        companyId: 1,
        notificationsEnabled: true,
      };

      const result: UserCompanyFollowing = {
        id: 1,
        user: { id: 1, name: 'User 1' } as any, // Mock de l'utilisateur simplifié
        company: {
          id: 1,
          name: 'Company 1',
          companyLogo: { name: 'Logo', url: 'http://example.com/logo.png' },
          primaryColor: '#FFFFFF',
          accountSubscriptionStatus: 'active',
          stripeAccountId: 'acct_123',
          stripeCustomerId: 'cus_123',
          reports: [],
          created_at: new Date(),
          updated_at: new Date(),
        } as any, // Mock simplifié de la compagnie
        notificationsEnabled: true,
      };

      jest.spyOn(service, 'followCompany').mockResolvedValue(result);

      expect(
        await controller.followCompany(createUserCompanyFollowingDto)
      ).toEqual(result);
      expect(service.followCompany).toHaveBeenCalledWith(
        createUserCompanyFollowingDto
      );
    });
  });

  // Test : Update Notifications
  describe('updateNotifications', () => {
    it('should update notifications', async () => {
      const updateUserCompanyFollowingDto: UpdateUserCompanyFollowingDto = {
        notificationsEnabled: false,
      };

      const result: UpdateResult = {
        generatedMaps: [],
        raw: {},
        affected: 1, // Signifie qu'une ligne a été affectée
      };

      jest.spyOn(service, 'updateNotifications').mockResolvedValue(result);

      expect(
        await controller.updateNotifications(
          1,
          1,
          updateUserCompanyFollowingDto
        )
      ).toEqual(result);
      expect(service.updateNotifications).toHaveBeenCalledWith(
        1,
        1,
        updateUserCompanyFollowingDto
      );
    });
  });

  // Test : Unfollow Company
  describe('unfollowCompany', () => {
    it('should unfollow a company', async () => {
      const result = { message: 'Company unfollowed successfully' };

      jest.spyOn(service, 'unfollowCompany').mockResolvedValue(result);

      expect(await controller.unfollowCompany(1, 1)).toEqual(result);
      expect(service.unfollowCompany).toHaveBeenCalledWith(1, 1);
    });
  });

  // Test : Get Following Companies
  describe('getFollowingCompanies', () => {
    it('should get companies followed by user', async () => {
      const userCompanyFollowings: UserCompanyFollowing[] = [
        {
          id: 1,
          user: { id: 1, name: 'User 1' } as any,
          company: {
            id: 1,
            name: 'Company 1',
            companyLogo: { name: 'Logo', url: 'http://example.com/logo.png' },
            primaryColor: '#FFFFFF',
            accountSubscriptionStatus: 'active',
            stripeAccountId: 'acct_123',
            stripeCustomerId: 'cus_123',
            reports: [],
            created_at: new Date(),
            updated_at: new Date(),
          } as any,
          notificationsEnabled: true,
        },
      ];

      // Extraire uniquement les objets company avant la comparaison
      const expectedCompanies = userCompanyFollowings.map(
        (following) => following.company
      );

      jest
        .spyOn(service, 'getFollowingCompanies')
        .mockResolvedValue(expectedCompanies);

      expect(await controller.getFollowingCompanies(1)).toEqual(
        expectedCompanies
      );
      expect(service.getFollowingCompanies).toHaveBeenCalledWith(1);
    });
  });
});
