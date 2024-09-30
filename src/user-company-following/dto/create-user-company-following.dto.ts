import { IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateUserCompanyFollowingDto {
  @IsNumber()
  @IsNotEmpty({ message: "L'ID de l'utilisateur est obligatoire." })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: "L'ID de la société est obligatoire." })
  companyId: number;

  @IsBoolean()
  notificationsEnabled: boolean;
}
