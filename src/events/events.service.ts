import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { companyId, ...eventData } = createEventDto;

    // Charger la société (Company) à partir de l'ID
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new Error('Company not found');  // Gérer le cas où l'entreprise n'est pas trouvée
    }

    // Créer l'événement et associer la société (Company)
    const event = this.eventRepository.create({
      ...eventData,
      company,  // Assigner l'entité Company chargée à l'événement
    });
    const savedEvent = await this.eventRepository.save(event);
    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
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
