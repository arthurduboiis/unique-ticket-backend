import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrmUsersService } from './crm_users.service';
import { CreateCrmUserDto } from './dto/create-crm_user.dto';
import { UpdateCrmUserDto } from './dto/update-crm_user.dto';

@Controller('crm-users')
export class CrmUsersController {
  constructor(private readonly crmUsersService: CrmUsersService) {}

  @Post()
  create(@Body() createCrmUserDto: CreateCrmUserDto) {
    return this.crmUsersService.create(createCrmUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crmUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrmUserDto: UpdateCrmUserDto) {
    return this.crmUsersService.update(+id, updateCrmUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crmUsersService.remove(+id);
  }
}
