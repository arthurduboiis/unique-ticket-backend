import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersController } from './crm_users.controller';
import { CrmUsersService } from './crm_users.service';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';

describe('CrmUsersController', () => {
  let controller: CrmUsersController;
  let service: CrmUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrmUsersController],
      providers: [
        {
          provide: CrmUsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CrmUsersController>(CrmUsersController);
    service = module.get<CrmUsersService>(CrmUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the create method of the service with the correct DTO', async () => {
      const createCrmUserDto: CreateCrmUserDto = {
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '+33123456789',
        email: 'john.doe@example.com',
        role: 'admin',
        newsletter: true,
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
      };

      const result = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '+33123456789',
        email: 'john.doe@example.com',
        role: 'admin',
        newsletter: true,
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        companies: [], // Ajout de la propriété companies
        created_at: new Date(), // Ajout de created_at
        updated_at: new Date(), // Ajout de updated_at
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCrmUserDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createCrmUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a crm user by id', async () => {
      const crmUserId = 1;
      const result = {
        id: crmUserId,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '+33123456789',
        email: 'john.doe@example.com',
        role: 'admin',
        newsletter: true,
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        companies: [], // Ajout de la propriété companies
        created_at: new Date(), // Ajout de created_at
        updated_at: new Date(), // Ajout de updated_at
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(crmUserId.toString())).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(crmUserId);
    });
  });

  describe('update', () => {
    it('should call the update method of the service with the correct ID and DTO', async () => {
      const crmUserId = 1;
      const updateCrmUserDto: UpdateCrmUserDto = {
        firstname: 'Jane',
      };

      const result = {
        id: crmUserId,
        firstname: 'Jane',
        lastname: 'Doe',
        phoneNumber: '+33123456789',
        email: 'jane.doe@example.com',
        role: 'admin',
        newsletter: true,
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        companies: [], // Ajout de la propriété companies
        created_at: new Date(), // Ajout de created_at
        updated_at: new Date(), // Ajout de updated_at
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await controller.update(crmUserId.toString(), updateCrmUserDto)
      ).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(crmUserId, updateCrmUserDto);
    });
  });

  describe('remove', () => {
    it('should call the remove method of the service with the correct ID', async () => {
      const crmUserId = 1;
      const result = {
        id: crmUserId,
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '+33123456789',
        email: 'john.doe@example.com',
        role: 'admin',
        newsletter: true,
        profilePicture: {
          name: 'profile-pic.png',
          url: 'https://example.com/profile-pic.png',
        },
        companies: [], // Ajout de la propriété companies
        created_at: new Date(), // Ajout de created_at
        updated_at: new Date(), // Ajout de updated_at
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(crmUserId.toString())).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(crmUserId);
    });
  });
});
