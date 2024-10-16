import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct data', async () => {
      const dto: CreateUserDto = { email: 'test@example.com', password: 'password' };
      const result = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'test@example.com',
        password: "password",
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct id', async () => {
      const result = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'test@example.com',
        password: "password",
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
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call service.update with correct id and data', async () => {
      const dto: UpdateUserDto = { email: 'updated@example.com' };
      const result = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        email: 'updated@example.com',
        password: "password",
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
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct id', async () => {
      const result = 'User deleted successfully'; // Change this to match the expected type
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
