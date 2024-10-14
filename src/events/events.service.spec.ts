import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Company } from '../companies/entities/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  CreateEventDto,
  CreateTicketCategoryDto,
} from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

describe('EventsService', () => {
  let service: EventsService;
  let eventRepository: Repository<Event>;
  let companyRepository: Repository<Company>;
  let ticketCategoryRepository: Repository<TicketCategory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TicketCategory),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company)
    );
    ticketCategoryRepository = module.get<Repository<TicketCategory>>(
      getRepositoryToken(TicketCategory)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an event with ticket categories', async () => {
      const ticketCategories = [
        {
          categoryName: 'General Admission',
          price: 20.5,
          totalTickets: 300,
          availableTickets: 300,
          categoryDescription: 'General admission tickets',
          ticketsScanned: 0,
          availabilityDateTickets: new Date('2024-10-10'),
        },
        {
          categoryName: 'VIP',
          price: 50.0,
          totalTickets: 50,
          categoryDescription: null,
          availableTickets: 50,
          ticketsScanned: 0,
          availabilityDateTickets: new Date('2024-10-10'),
        },
      ] as CreateTicketCategoryDto[];

      const createEventDto: CreateEventDto = {
        title: 'Concert',
        description: 'Music event',
        capacity: 500,
        city: 'Paris',
        contractAddress: '0x123',
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-10-21'),
        eventType: 'Concert',
        image: 'concert.jpg',
        place: 'Olympia',
        startingPrice: 20.5,
        companyId: 1,
        ticketCategories,
      };

      const company = { id: 1, name: 'Company 1' } as Company;

      // Create full TicketCategory objects
      const savedTicketCategories = createEventDto.ticketCategories.map(
        (category, index) => ({
          id: index + 1, // Add ID since it's required
          ...category,
          event: { id: 1 } as Event, // Assume an event is associated
        })
      );

      const event = {
        id: 1,
        ...createEventDto,
        company,
        ticketCategories: savedTicketCategories,
        likes: [],
        tickets: null,
        created_at: new Date(),
        updated_at: new Date(),
      } as Event;

      // Mock company lookup
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company);
      // Mock event creation and save
      jest.spyOn(eventRepository, 'create').mockReturnValue(event);
      jest.spyOn(eventRepository, 'save').mockResolvedValue(event);
      // Mock ticket category creation and save

      jest.spyOn(ticketCategoryRepository, 'create').mockImplementation(() => ({
        id: 1,
        ...(createEventDto.ticketCategories[0] as TicketCategory),
        event: { id: 1 } as Event,
      }));
      jest
        .spyOn(ticketCategoryRepository, 'save')
        .mockImplementation(async () => ({
          id: 1,
          ...(createEventDto.ticketCategories[0] as TicketCategory),
          event: { id: 1 } as Event,
        }));

      const result = await service.create(createEventDto);

      expect(result).toEqual(event);
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      const eventBeforeCreate = {
        title: 'Concert',
        description: 'Music event',
        capacity: 500,
        city: 'Paris',
        contractAddress: '0x123',
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-10-21'),
        eventType: 'Concert',
        image: 'concert.jpg',
        place: 'Olympia',
        company,
        startingPrice: 20.5,
      };

      expect(eventRepository.create).toHaveBeenCalledWith(eventBeforeCreate);

      expect(eventRepository.save).toHaveBeenCalledWith(event);
      expect(ticketCategoryRepository.create).toHaveBeenCalledTimes(2); // Two ticket categories
      expect(ticketCategoryRepository.save).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if company not found', async () => {
      const createEventDto: CreateEventDto = {
        title: 'Concert',
        description: 'Music event',
        capacity: 500,
        city: 'Paris',
        contractAddress: '0x123',
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-10-21'),
        eventType: 'Concert',
        image: 'concert.jpg',
        place: 'Olympia',
        startingPrice: 20.5,
        companyId: 999, // Invalid companyId
        ticketCategories: [
          {
            categoryName: 'General Admission',
            price: 20.5,
            totalTickets: 300,
            availableTickets: 300,
            categoryDescription: 'General admission tickets',
            ticketsScanned: 0,
            availabilityDateTickets: new Date('2024-10-10'),
          },
        ],
      };

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createEventDto)).rejects.toThrow(
        'Company not found'
      );
    });

    it('should create an event without ticket categories if none are provided', async () => {
      const createEventDto: CreateEventDto = {
        title: 'Concert',
        description: 'Music event',
        capacity: 500,
        city: 'Paris',
        contractAddress: '0x123',
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-10-21'),
        eventType: 'Concert',
        image: 'concert.jpg',
        place: 'Olympia',
        startingPrice: 20.5,
        companyId: 1,
        ticketCategories: [] as CreateTicketCategoryDto[], 
      };

      const company = { id: 1, name: 'Company 1' } as Company;
      const event = {
        id: 1,
        ...createEventDto,
        company,
        ticketCategories: [],
        likes: [],
        tickets: null,
        created_at: new Date(),
        updated_at: new Date(),
      } as Event;

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(company);

      await expect(service.create(createEventDto)).rejects.toThrow(
        'An event must have at least one ticket category'
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events = [
        {
          id: 1,
          title: 'Event 1',
          description: 'Description 1',
          company: { id: 1, name: 'Company 1' },
        },
        {
          id: 2,
          title: 'Event 2',
          description: 'Description 2',
          company: { id: 2, name: 'Company 2' },
        },
      ] as Event[];

      jest.spyOn(eventRepository, 'find').mockResolvedValue(events);

      const result = await service.findAll();

      expect(result).toEqual(events);
      expect(eventRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const event = {
        id: 1,
        title: 'Event 1',
        description: 'Description 1',
      } as Event;

      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(event);

      const result = await service.findOne(1);

      expect(result).toEqual(event);
      expect(eventRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if event is not found', async () => {
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = { title: 'Updated Event' };

      const event = {
        id: 1,
        title: 'Event 1',
        description: 'Description 1',
      } as Event;
      const updatedEvent = { ...event, ...updateEventDto } as Event;

      jest.spyOn(service, 'findOne').mockResolvedValue(event);
      jest.spyOn(eventRepository, 'save').mockResolvedValue(updatedEvent);

      const result = await service.update(1, updateEventDto);

      expect(result).toEqual(updatedEvent);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(eventRepository.save).toHaveBeenCalledWith(updatedEvent);
    });
  });

  describe('remove', () => {
    it('should remove an event by id', async () => {
      const event = {
        id: 1,
        title: 'Event 1',
        description: 'Description 1',
      } as Event;

      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(event);
      jest.spyOn(eventRepository, 'delete').mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual(event);
      expect(eventRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(eventRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if event is not found', async () => {
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
