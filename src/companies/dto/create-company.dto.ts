import {
  IsString,
  IsNotEmpty,
  IsJSON,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CrmUser } from '../../crm_users/entities/crm_user.entity';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsJSON()
  companyLogo: {
    name: string;
    url: string;
  };

  @IsString()
  @IsNotEmpty()
  primaryColor: string;

  @IsString()
  @IsNotEmpty()
  accountSubscriptionStatus: string;

  @IsString()
  @IsOptional()
  stripeAccountId: string;

}
