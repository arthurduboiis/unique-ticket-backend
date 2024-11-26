import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

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