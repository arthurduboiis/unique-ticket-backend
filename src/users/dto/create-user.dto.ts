import { IsString, IsEmail, IsOptional, IsBoolean, IsDateString, IsNotEmpty, MinLength} from 'class-validator';

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

  @IsString()
  @IsNotEmpty({ message: 'Mot de passe obligatoire.' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  password: string;

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
