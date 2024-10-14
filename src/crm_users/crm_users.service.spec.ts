import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersService } from './crm_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrmUser } from './entities/crm_user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a crm user', async () => {
      const createCrmUserDto: CreateCrmUserDto = {
        firstname: 'John',
        lastname: 'Doe', // `lastname` obligatoire
        email: 'john.doe@example.com',
        phoneNumber: '+33123456789',
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        role: 'admin',
        newsletter: true,
      };

      // Ajout des propriétés manquantes pour matcher l'entité `CrmUser`
      const savedCrmUser = {
        id: 1,
        ...createCrmUserDto,
        companies: [], // Ajout de la propriété `companies`
        created_at: new Date(), // Ajout de la propriété `created_at`
        updated_at: new Date(), // Ajout de la propriété `updated_at`
      };

      jest.spyOn(repository, 'create').mockReturnValue(savedCrmUser);
      jest.spyOn(repository, 'save').mockResolvedValue(savedCrmUser);

      const result = await service.create(createCrmUserDto);

      expect(result).toEqual(savedCrmUser);
      expect(repository.create).toHaveBeenCalledWith(createCrmUserDto);
      expect(repository.save).toHaveBeenCalledWith(savedCrmUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of crm users', async () => {
      const crmUsers = [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+33123456789',
          profilePicture: {
            name: 'profile-pic.png',
            url: 'https://example.com/profile-pic.png',
          },
          role: 'admin',
          newsletter: true,
          companies: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(crmUsers);

      const result = await service.findAll();

      expect(result).toEqual(crmUsers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a crm user by id', async () => {
      const crmUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+33123456789',
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        role: 'admin',
        newsletter: true,
        companies: [],
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(crmUser);

      const result = await service.findOne(1);

      expect(result).toEqual(crmUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if crm user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should update a crm user', async () => {
      const updateCrmUserDto: UpdateCrmUserDto = {
        firstname: 'Jane',
        lastname: 'Doe', // Assurez-vous que `lastname` est toujours présent
      };

      const crmUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+33123456789',
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        role: 'admin',
        newsletter: true,
        companies: [],
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedCrmUser = {
        ...crmUser,
        ...updateCrmUserDto,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(crmUser);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedCrmUser);

      const result = await service.update(1, updateCrmUserDto);

      expect(result).toEqual(updatedCrmUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(updatedCrmUser);
    });
  });

  describe('remove', () => {
    it('should remove a crm user by id', async () => {
      const crmUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+33123456789',
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        role: 'admin',
        newsletter: true,
        companies: [],
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(crmUser);
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual(crmUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if crm user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
