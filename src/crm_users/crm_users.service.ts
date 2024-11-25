import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';
import { CrmUser } from './entities/crm_user.entity';

@Injectable()
export class CrmUsersService {
  constructor(
    @InjectRepository(CrmUser)
    private readonly crmUsersRepository: Repository<CrmUser>,
  ) {}

  async create(createCrmUserDto: CreateCrmUserDto): Promise<CrmUser> {
    const newUser = this.crmUsersRepository.create(createCrmUserDto);
    const savedUser = await this.crmUsersRepository.save(newUser);
    return savedUser;
  }

  async findAll(): Promise<CrmUser[]> {
    return await this.crmUsersRepository.find();
  }

  async findOne(id: number): Promise<CrmUser> {
    const user = await this.crmUsersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`CrmUser with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<CrmUser> {
    const user = await this.crmUsersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`CrmUser with email ${email} not found`);
    }
    return user;
  }



  async update(id: number, updateCrmUserDto: UpdateCrmUserDto): Promise<CrmUser> {
    const user = await this.findOne(id); // Will throw NotFoundException if not found
    Object.assign(user, updateCrmUserDto);
    return await this.crmUsersRepository.save(user);
  }

  async remove(id: number): Promise<CrmUser> {
    const user = await this.crmUsersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`CrmUser with ID ${id} not found`);
    }
    await this.crmUsersRepository.delete(id);
    return user;
  }
}
