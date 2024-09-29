import { Injectable } from '@nestjs/common';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';

@Injectable()
export class CrmUsersService {
  create(createCrmUserDto: CreateCrmUserDto) {
    return 'This action adds a new crmUser';
  }

  findAll() {
    return `This action returns all crmUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crmUser`;
  }

  update(id: number, updateCrmUserDto: UpdateCrmUserDto) {
    return `This action updates a #${id} crmUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} crmUser`;
  }
}
