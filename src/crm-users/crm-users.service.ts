import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrmUser } from './crm-user.entity'

@Injectable()
export class CrmUsersService {
  constructor(
    @InjectRepository(CrmUser)
    private readonly userRepository: Repository<CrmUser>
  ) {}

  findAll(): Promise<CrmUser[]> {
    return this.userRepository.find()
  }

  findOne(id: number): Promise<CrmUser> {
    return this.userRepository.findOneBy({id})
  }

  create(user: CrmUser): Promise<CrmUser> {
    return this.userRepository.save(user)
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }
}
