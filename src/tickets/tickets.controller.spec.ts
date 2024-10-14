import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        category: 'VIP',
        tokenId: 12345,
        used: false,
        event: {} as Event, // Simuler un objet Event minimal
        user: {} as User, // Simuler un objet User minimal
      };

      // Ajoutez une chaîne de caractères attendue en sortie
      const result = 'This action adds a new ticket';

      // Utilisez async pour simuler le retour d'une promesse
      jest.spyOn(service, 'create').mockResolvedValue(result);

      // Utilisez await pour comparer correctement la promesse résolue
      expect(await controller.create(createTicketDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('findAll', () => {
    it('should return all tickets', async () => {
      const result = 'This action returns all tickets';
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single ticket by ID', async () => {
      const result = 'This action returns a #1 ticket';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a ticket by ID', async () => {
      const updateTicketDto: UpdateTicketDto = {
        category: 'General',
        tokenId: 12345,
        used: true,
        event: {} as Event, // Simuler un objet Event minimal
        user: {} as User, // Simuler un objet User minimal
      };

      const result = 'This action updates a #1 ticket';
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateTicketDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a ticket by ID', async () => {
      const result = 'This action removes a #1 ticket';
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
