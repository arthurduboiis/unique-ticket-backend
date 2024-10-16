import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto, CreateTicketCategoryDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Company } from 'src/companies/entities/company.entity';
describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
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

      jest.spyOn(service, 'create').mockResolvedValue(event);

      expect(await controller.create(createEventDto)).toEqual(event);
      expect(service.create).toHaveBeenCalledWith(createEventDto);
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
      jest.spyOn(service, 'findAll').mockResolvedValue(events);

      expect(await controller.findAll()).toEqual(events);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const result = {
        id: 1,
        title: 'Event 1',
        description: 'Description 1',
        capacity: 100,
        city: 'City 1',
        contractAddress: '0x123',
        coOrganizer: 'Co-organizer 1',
        mood: 'Mood 1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02'),
        eventType: 'Concert',
        image: 'image1.jpg',
        place: 'Place 1',
        startingPrice: 50.0,
        ticketCategories: [],
        company: { id: 1, name: 'Company 1' },
      } as Event;

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
        description: 'Updated Description',
      };

      const result = {
        id: 1,
        ...updateEventDto,
      } as Event;

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateEventDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove an event by id', async () => {
      const result = {
        id: 1,
        title: 'Event 1',
        description: 'Description 1',
      } as Event;

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
