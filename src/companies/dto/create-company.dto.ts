import {
  IsString,
  IsNotEmpty,
  IsJSON,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

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

  @IsUUID()
  @IsOptional()
  creatorId: number;
}
