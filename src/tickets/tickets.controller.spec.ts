import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findAllTicketsForUser: jest.fn(),
            findTicketsForUserBetweenDates: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct data', async () => {
      const createTicketDto: CreateTicketDto = {
        eventId: 1,
        userId: 1,
        category: 'VIP',
        tokenId: 12345,
        used: false,
      };

      await controller.create(createTicketDto);
      expect(service.create).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('updateTicketUsed', () => {
    it('should update the used status of a ticket', async () => {
      const updateTicketDto: UpdateTicketDto = { used: true };

      await controller.updateTicketUsed('1', updateTicketDto);
      expect(service.update).toHaveBeenCalledWith(1, updateTicketDto);
    });
  });

  describe('findAllTicketsForUser', () => {
    it('should return all tickets for a user', async () => {
      await controller.findAllTicketsForUser(1);
      expect(service.findAllTicketsForUser).toHaveBeenCalledWith(1);
    });
  });

  describe('findTicketsForUserBetweenDates', () => {
    it('should return all tickets between dates for a user', async () => {
      const startDate = '2023-01-01';
      const endDate = '2023-12-31';

      await controller.findTicketsForUserBetweenDates(1, startDate, endDate);
      expect(service.findTicketsForUserBetweenDates).toHaveBeenCalledWith(
        1,
        new Date(startDate),
        new Date(endDate)
      );
    });
  });
});
