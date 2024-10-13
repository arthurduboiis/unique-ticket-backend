import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsUrl,
  IsEnum,
  IsArray,
  IsBoolean,
  IsPhoneNumber,
  IsNumber,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum AccessLevel {
  FULL = 'admin',
  LIMITED = 'member',
  NONE = 'none',
}
export class ProfilePictureDto {
  @IsString()
  @IsNotEmpty({ message: "Le nom de l'image est obligatoire." })
  name: string;

  @IsUrl({}, { message: 'URL de l’image invalide.' })
  url: string;
}

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateCrmUserDto {
  @IsString()
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères.' })
  firstname: string;

  @IsString()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères.' })
  @IsOptional()
  lastname?: string;

  @IsPhoneNumber('FR', { message: 'Numéro de téléphone invalide.' })
  @IsOptional()
  phoneNumber?: string;

  @IsEmail({}, { message: 'Email invalide.' })
  @IsNotEmpty({ message: 'Email est obligatoire.' })
  email: string;

  @ValidateNested()
  @Type(() => ProfilePictureDto)
  @IsOptional()
  profilePicture?: ProfilePictureDto;

  @IsNumber(
    {},
    { message: 'L’identifiant de l’entreprise doit être un nombre.' }
  )

  @IsString()
  @IsOptional()
  role?: string;

  @IsBoolean({ message: 'La newsletter doit être un booléen (true ou false).' })
  @IsOptional()
  newsletter?: boolean;
}
