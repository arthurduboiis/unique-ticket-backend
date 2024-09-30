import { IsString, IsEmail, IsOptional, IsBoolean, IsDateString, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../../events/entities/event.entity';
import { UserCompanyFollowing } from '../../user-company-following/entities/user-company-following.entity';

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

  // Tableau d'IDs d'événements aimés par l'utilisateur
  @IsArray()
  @IsOptional()
  @IsUUID(4, { each: true, message: 'Chaque ID d\'événement doit être un UUID valide.' })
  likedEvents?: string[]; // Assume qu'on passe un tableau d'UUID d'events

  // Tableau de relations avec Company (following)
  @ValidateNested({ each: true })
  @Type(() => UserCompanyFollowing)
  @IsOptional()
  following?: UserCompanyFollowing[];
}
