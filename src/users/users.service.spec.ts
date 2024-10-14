import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { email: 'test@example.com' };
      const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'test@example.com',
        newsletter: true,
        region: 'NA',
        gender: 'male',
        birthdate: '1990-01-01',
        wallet_address: '0x123456789',
        tickets: [],
        liked: [],
        following: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.create(createUserDto)).toEqual(user);
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'test@example.com',
        newsletter: true,
        region: 'NA',
        gender: 'male',
        birthdate: '1990-01-01',
        wallet_address: '0x123456789',
        tickets: [],
        liked: [],
        following: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findOne(1)).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { email: 'updated@example.com' };
      const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'updated@example.com',
        newsletter: true,
        region: 'NA',
        gender: 'male',
        birthdate: '1990-01-01',
        wallet_address: '0x123456789',
        tickets: [],
        liked: [],
        following: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.update(1, updateUserDto)).toEqual(user);
      expect(repository.save).toHaveBeenCalledWith({ id: 1, ...updateUserDto });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: [] }; // Mocking a valid DeleteResult
      const result = 'User deleted successfully';

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await service.remove(1)).toBe(result);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
