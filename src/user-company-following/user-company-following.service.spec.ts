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

  describe('followCompany', () => {
    it('should follow a company', async () => {
      const createUserCompanyFollowingDto = {
        userId: 1,
        companyId: 1,
        notificationsEnabled: true,
      };

      const savedUserCompanyFollowing: UserCompanyFollowing = {
        id: 1,
        user: { id: 1 } as User,
        company: { id: 1 } as Company,
        notificationsEnabled: true,
      };

      jest.spyOn(userCompanyFollowingRepository, 'create').mockReturnValue(savedUserCompanyFollowing);
      jest.spyOn(userCompanyFollowingRepository, 'save').mockResolvedValue(savedUserCompanyFollowing);

      const result = await service.followCompany(createUserCompanyFollowingDto);

      expect(result).toEqual(savedUserCompanyFollowing);
      expect(userCompanyFollowingRepository.create).toHaveBeenCalledWith({
        user: { id: 1 },
        company: { id: 1 },
        notificationsEnabled: true,
      });
      expect(userCompanyFollowingRepository.save).toHaveBeenCalledWith(savedUserCompanyFollowing);
    });
  });


  describe('updateNotifications', () => {
    it('should update notifications', async () => {
      const updateUserCompanyFollowingDto = { notificationsEnabled: false };

      const companyMock: Company = {
        id: 1,
        name: 'Company 1',
        companyLogo: { name: 'logo.png', url: 'http://example.com/logo.png' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_123',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };

      const userCompanyFollowing: UserCompanyFollowing = {
        id: 1,
        user: { id: 1 } as User,
        company: companyMock,
        notificationsEnabled: true,
      };

      jest.spyOn(userCompanyFollowingRepository, 'update').mockResolvedValue({ affected: 1 } as any); // Mock `update`

      const result = await service.updateNotifications(1, 1, updateUserCompanyFollowingDto);

      expect(result).toEqual({ affected: 1 }); // Simuler la mise à jour réussie
      expect(userCompanyFollowingRepository.update).toHaveBeenCalledWith(
        { user: { id: 1 }, company: { id: 1 } },
        { notificationsEnabled: false },
      );
    });
  });


  describe('unfollowCompany', () => {
    it('should unfollow a company', async () => {
      const deleteResult: DeleteResult = { affected: 1 } as DeleteResult;

      jest.spyOn(userCompanyFollowingRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.unfollowCompany(1, 1);

      expect(result).toEqual({
        message: `L'utilisateur 1 ne suit plus l'entreprise 1`,
      });
      expect(userCompanyFollowingRepository.delete).toHaveBeenCalledWith({
        user: { id: 1 },
        company: { id: 1 },
      });
    });
  });


  describe('getFollowingCompanies', () => {
    it('should return companies followed by user', async () => {
      // Simuler une entité Company
      const companyMock: Company = {
        id: 1,
        name: 'Company 1',
        companyLogo: { name: 'logo.png', url: 'http://example.com/logo.png' },
        primaryColor: '#FFFFFF',
        accountSubscriptionStatus: 'active',
        stripeAccountId: 'acct_123',
        events: [],
        members: [],
        followers: [],
        reports: [],
      };

      // Simuler une entité UserCompanyFollowing qui inclut la compagnie
      const userCompanyFollowings: UserCompanyFollowing[] = [
        {
          id: 1,
          user: { id: 1 } as User,  // Simuler l'utilisateur
          company: companyMock,     // Simuler la compagnie
          notificationsEnabled: true,
        },
      ];

      // Mock la méthode find du repository pour retourner UserCompanyFollowing[]
      jest.spyOn(userCompanyFollowingRepository, 'find').mockResolvedValue(userCompanyFollowings);

      // Appelle la méthode du service
      const result = await service.getFollowingCompanies(1);

      // Le service doit renvoyer uniquement un tableau contenant les compagnies suivies
      expect(result).toEqual([companyMock]);
      expect(userCompanyFollowingRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        relations: ['company'],  // Charger la relation avec la compagnie
      });
    });
  });
});
