import { IsString, IsEmail, IsOptional, IsBoolean, IsDateString} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsDateString({}, { message: 'Date de naissance invalide.' })
  @IsOptional()
  birthdate?: string;

  @IsString()
  @IsOptional()
  wallet_address?: string;
  
}
