import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { TicketCategory } from './entities/ticket-category.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(TicketCategory)
    private readonly ticketCategoryRepository: Repository<TicketCategory>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { companyId, ticketCategories, ...eventData } = createEventDto;
  
    // Vérifier qu'il y a au moins une catégorie de tickets
    if (!ticketCategories || ticketCategories.length === 0) {
      throw new Error('An event must have at least one ticket category');
    }
  
    // Charger la société (Company) à partir de l'ID
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new Error('Company not found');  // Gérer le cas où l'entreprise n'est pas trouvée
    }
  
    // Créer l'événement sans les catégories de tickets
    const event = this.eventRepository.create({
      ...eventData,
      company,
    });
  
    // Sauvegarder l'événement
    const savedEvent = await this.eventRepository.save(event);
  
    // Créer et associer les catégories de tickets à l'événement
    const savedTicketCategories = await Promise.all(
      ticketCategories.map(async (categoryData) => {
        const ticketCategory = this.ticketCategoryRepository.create({
          ...categoryData,
          event: savedEvent,  // Lier chaque catégorie de tickets à l'événement
        });
        return this.ticketCategoryRepository.save(ticketCategory);
      })
    );
  
    // Assigner les catégories de tickets sauvegardées à l'événement
    savedEvent.ticketCategories = savedTicketCategories;
  
    return savedEvent;
  }
  
  
  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      relations: ['ticketCategories', 'company', 'likes'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return await this.eventRepository.save(event);
  }

  async remove(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await this.eventRepository.delete(id);
    return event;
  }
}
