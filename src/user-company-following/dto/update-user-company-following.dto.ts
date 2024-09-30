import { IsBoolean } from 'class-validator';

export class UpdateUserCompanyFollowingDto {
  @IsBoolean()
  notificationsEnabled: boolean;
}
