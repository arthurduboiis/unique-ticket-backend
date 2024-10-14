import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Event } from '../events/entities/event.entity'; // Import Event entity
import { DeleteResult } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let eventRepository: Repository<Event>; // Add event repository mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Event), // Add this mock for EventRepository
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event)); // Assign event repository
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for creating a user
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

      // Mock the `create` and `save` methods
      jest.spyOn(userRepository, 'create').mockReturnValue(user as any); // Return the user object
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(result).toEqual(user);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  // Test for finding a user
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

      // Mock the `findOne` method
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['liked', 'following'],
      });
    });
  });

  // Test for updating a user
  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { email: 'updated@example.com' };
      const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'updated@example.com', // Email mis à jour
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
  
      // Mock the `findOne` and `save` methods
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
  
      const result = await service.update(1, updateUserDto);
  
      expect(result).toEqual(user);
  
      // Expect the full object to be passed to save
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['liked', 'following'],
      });
  
      // Vérifier que save a bien été appelé avec l'objet complet
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        email: updateUserDto.email, // Seule l'email a été modifiée
      });
    });
  });
  

  // Test for removing a user
  describe('remove', () => {
    it('should remove a user', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: [] }; // Mocking a valid DeleteResult
      const result = "L'utilisateur a été supprimé avec succès.";

      // Mock the `delete` method
      jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

      expect(await service.remove(1)).toBe(result);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
