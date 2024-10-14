import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ticket', () => {
      const createTicketDto: CreateTicketDto = {
        category: 'VIP',
        tokenId: 12345,
        used: false,
        event: {} as any, // Simulez un objet Event
        user: {} as any, // Simulez un objet User
      };

      expect(service.create(createTicketDto)).toBe(
        'This action adds a new ticket'
      );
    });
  });

  describe('findAll', () => {
    it('should return all tickets', () => {
      expect(service.findAll()).toBe('This action returns all tickets');
    });
  });

  describe('findOne', () => {
    it('should return a single ticket by ID', () => {
      expect(service.findOne(1)).toBe('This action returns a #1 ticket');
    });
  });

  describe('update', () => {
    it('should update a ticket by ID', () => {
      const updateTicketDto: UpdateTicketDto = { category: 'General' };
      expect(service.update(1, updateTicketDto)).toBe(
        'This action updates a #1 ticket'
      );
    });
  });

  describe('remove', () => {
    it('should remove a ticket by ID', () => {
      expect(service.remove(1)).toBe('This action removes a #1 ticket');
    });
  });
});
