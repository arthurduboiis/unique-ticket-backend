import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersService } from './crm_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrmUser } from './entities/crm_user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';
import { DeepPartial } from 'typeorm';

describe('CrmUsersService', () => {
  let service: CrmUsersService;
  let repository: Repository<CrmUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrmUsersService,
        {
          provide: getRepositoryToken(CrmUser),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CrmUsersService>(CrmUsersService);
    repository = module.get<Repository<CrmUser>>(getRepositoryToken(CrmUser));
  });

  describe('create', () => {
    it('should create and save a crm user', async () => {
      const createCrmUserDto: CreateCrmUserDto = {
        firstname: 'John',
        lastname: 'Doe', // Obligatoire dans ce contexte
        email: 'john.doe@example.com',
        password: 'password',
        phoneNumber: '+33123456789',
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        role: 'admin',
        newsletter: true,
      };

      const savedCrmUser: DeepPartial<CrmUser> = {
        id: 1,
        ...createCrmUserDto,
        companies: [], // Propriété obligatoire selon l'entité
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(savedCrmUser as CrmUser);
      jest.spyOn(repository, 'save').mockResolvedValue(savedCrmUser as CrmUser);

      const result = await service.create(createCrmUserDto);

      expect(result).toEqual(savedCrmUser);
      expect(repository.create).toHaveBeenCalledWith(createCrmUserDto);
      expect(repository.save).toHaveBeenCalledWith(savedCrmUser);
    });
  });
});
