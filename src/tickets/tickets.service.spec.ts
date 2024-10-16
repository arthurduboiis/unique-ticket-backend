// import { Test, TestingModule } from '@nestjs/testing';
// import { TicketsService } from './tickets.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Ticket } from './entities/ticket.entity';
// import { Event } from 'src/events/entities/event.entity';
// import { User } from 'src/users/entities/user.entity';
// import { CreateTicketDto } from './dto/create-ticket.dto';
// import { NotFoundException } from '@nestjs/common';
// import { EventsService } from '../events/events.service'; // Mock EventService
// import { UsersService } from '../users/users.service';   // Mock UserService

// describe('TicketsService', () => {
//   let service: TicketsService;
//   let ticketRepository: Repository<Ticket>;
//   let eventRepository: Repository<Event>;
//   let userRepository: Repository<User>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         TicketsService,
//         {
//           provide: getRepositoryToken(Ticket),
//           useValue: {}, // Mock Repository Ticket
//         },
//         {
//           provide: EventsService,
//           useValue: { findById: jest.fn() }, // Mock EventService
//         },
//         {
//           provide: UsersService,
//           useValue: { findById: jest.fn() }, // Mock UserService
//         },
//       ],
//     }).compile();

//     service = module.get<TicketsService>(TicketsService);
//     ticketRepository = module.get<Repository<Ticket>>(
//       getRepositoryToken(Ticket)
//     );
//     eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
//     userRepository = module.get<Repository<User>>(getRepositoryToken(User));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a new ticket', async () => {
//       const mockEvent = { id: 1 } as Event;
//       const mockUser = { id: 1 } as User;
//       const mockTicketDto = {
//         id: 1,
//         category: 'VIP',
//         tokenId: 12345,
//         used: false,
//         eventId: mockEvent.id,
//         userId: mockUser.id,
//       } as CreateTicketDto;

//       const mockTicket = {
//         id: 1,
//         category: 'VIP',
//         tokenId: 12345,
//         used: false,
//         event: mockEvent,
//         user: mockUser,
//       } as Ticket;

//       jest.spyOn(eventRepository, 'findOne').mockResolvedValue(mockEvent);
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
//       jest.spyOn(ticketRepository, 'create').mockReturnValue(mockTicket);
//       jest.spyOn(ticketRepository, 'save').mockResolvedValue(mockTicket);

//       const result = await service.create(mockTicketDto);
//       expect(result).toEqual(mockTicketDto);
//       expect(ticketRepository.create).toHaveBeenCalledWith({
//         category: 'VIP',
//         tokenId: 12345,
//         used: false,
//         event: mockEvent,
//         user: mockUser,
//       });
//     });

//     it('should throw an error if event or user not found', async () => {
//       const mockEvent = { id: 1 } as Event;
//       const mockUser = { id: 1 } as User;
//       const mockTicket = {
//         id: 1,
//         category: 'VIP',
//         tokenId: 12345,
//         used: false,
//         eventId: mockEvent.id,
//         userId: mockUser.id,
//       } as CreateTicketDto;

//       jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

//       await expect(service.create(mockTicket)).rejects.toThrow(
//         'Event or User not found'
//       );
//     });
//   });

//   describe('findAllTicketsForUser', () => {
//     it('should return all tickets for a user', async () => {
//       const mockEvent = { id: 1 } as Event;
//       const mockUser = { id: 1 } as User;
//       const mockTicket = {
//         id: 1,
//         category: 'VIP',
//         tokenId: 12345,
//         used: false,
//         event: mockEvent,
//         user: mockUser,
//       } as Ticket;

//       const mockTickets = [mockTicket];

//       jest
//         .spyOn(ticketRepository, 'find')
//         .mockResolvedValue(mockTickets as Ticket[]);

//       const result = await service.findAllTicketsForUser(1);
//       expect(result).toEqual(mockTicket);
//       expect(ticketRepository.find).toHaveBeenCalledWith({
//         where: { user: { id: 1 } },
//         relations: ['event'],
//       });
//     });
//   });

//   describe('findTicketsForUserBetweenDates', () => {
//     it('should return all tickets between dates for a user', async () => {
//       const mockTickets = [
//         {
//           id: 1,
//           category: 'VIP',
//           user: { id: 1 },
//           event: { startDate: new Date(), endDate: new Date(), id: 1 },
//           used: false,
//         },
//       ];

//       jest.spyOn(ticketRepository, 'createQueryBuilder').mockImplementation(
//         () =>
//           ({
//             leftJoinAndSelect: jest.fn().mockReturnThis(),
//             where: jest.fn().mockReturnThis(),
//             andWhere: jest.fn().mockReturnThis(),
//             getMany: jest.fn().mockResolvedValue(mockTickets),
//           }) as any
//       );

//       const result = await service.findTicketsForUserBetweenDates(
//         1,
//         new Date('2023-01-01'),
//         new Date('2023-12-31')
//       );
//       expect(result).toEqual(mockTickets);
//     });
//   });

//   describe('update', () => {
//     it('should update the used status of a ticket', async () => {
//       const mockTicket = { id: 1, used: false } as Ticket;

//       jest.spyOn(ticketRepository, 'findOne').mockResolvedValue(mockTicket);
//       jest
//         .spyOn(ticketRepository, 'save')
//         .mockResolvedValue({ ...mockTicket, used: true });

//       const result = await service.update(1, { used: true });
//       expect(result.used).toBe(true);
//     });

//     it('should throw a NotFoundException if ticket is not found', async () => {
//       jest.spyOn(ticketRepository, 'findOne').mockResolvedValue(null);

//       await expect(service.update(1, { used: true })).rejects.toThrow(
//         NotFoundException
//       );
//     });
//   });
// });
