import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
      const createEventDto: CreateEventDto = {
        title: 'Test Event',
        description: 'Test Description',
        capacity: 100,
        city: 'Test City',
        contractAddress: '0x123',
        coOrganizer: 'Co-organizer',
        mood: 'Exciting',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02'),
        eventType: 'Concert',
        image: 'test.jpg',
        place: 'Test Place',
        startingPrice: 50.0,
        ticketCategories: [
          {
            categoryName: 'VIP',
            categoryDescription: 'VIP Tickets',
            price: 100.0,
            totalTickets: 50,
            availableTickets: 40,
            ticketsScanned: 10,
            availabilityDateTickets: new Date('2024-12-20'),
          },
        ],
        companyId: 1,
      };

      const result = { id: 1, ...createEventDto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createEventDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = [
        {
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
          companyId: 1,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
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
        companyId: 1,
      };

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
      };

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
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
