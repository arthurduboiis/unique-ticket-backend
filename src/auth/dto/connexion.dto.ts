import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for user connexion.
 * This class is used to validate the data provided during user login.
 */
export class ConnexionDto {
  @IsString()
  @IsNotEmpty({ message: 'Email obligatoire.' })
  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @IsNotEmpty({ message: 'Mot de passe obligatoire.' })
  password: string;

}