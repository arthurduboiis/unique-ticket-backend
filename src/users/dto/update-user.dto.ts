import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserCompanyFollowing } from '../../user-company-following/entities/user-company-following.entity';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsArray()
  @IsUUID(4, { each: true, message: 'Chaque ID d\'événement doit être un UUID valide.' })
  @IsOptional()
  liked?: string[]; // Assume qu'on passe un tableau d'UUID d'events

  // Tableau de relations avec Company (following)
  @ValidateNested({ each: true })
  @Type(() => UserCompanyFollowing)
  @IsOptional()
  following?: UserCompanyFollowing[];
}
