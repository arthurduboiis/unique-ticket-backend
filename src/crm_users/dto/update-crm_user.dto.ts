import { PartialType } from '@nestjs/mapped-types';
import { CreateCrmUserDto } from './create-crm_user.dto';

export class UpdateCrmUserDto extends PartialType(CreateCrmUserDto) {}
