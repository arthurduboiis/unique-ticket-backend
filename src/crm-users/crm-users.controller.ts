import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { CrmUsersService } from './crm-users.service'
import { CrmUser } from './crm-user.entity'

@Controller('users')
export class CrmUsersController {
  constructor(private readonly usersService: CrmUsersService) {}

  @Get()
  findAll(): Promise<CrmUser[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CrmUser> {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() user: CrmUser): Promise<CrmUser> {
    return this.usersService.create(user)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id)
  }
}
