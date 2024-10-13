import { PartialType } from '@nestjs/mapped-types';
import { CreateCrmUsersMemberOfCompanyDto } from './create-crm-users-member-of-company.dto';

export class UpdateCrmUsersMemberOfCompanyDto extends PartialType(CreateCrmUsersMemberOfCompanyDto) {}
