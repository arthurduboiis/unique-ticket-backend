import { Controller, Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { UserCompanyFollowingService } from './user-company-following.service';
import { CreateUserCompanyFollowingDto } from './dto/create-user-company-following.dto';
import { UpdateUserCompanyFollowingDto } from './dto/update-user-company-following.dto';

@Controller('user-company-following')
export class UserCompanyFollowingController {
  constructor(private readonly userCompanyFollowingService: UserCompanyFollowingService) {}

  // Endpoint pour suivre une entreprise (POST /user-company-following/follow)
  @Post('follow')
  followCompany(@Body() createUserCompanyFollowingDto: CreateUserCompanyFollowingDto) {
    return this.userCompanyFollowingService.followCompany(createUserCompanyFollowingDto);
  }

  // Endpoint pour mettre à jour les notifications (PATCH /user-company-following/notifications/:userId/:companyId)
  @Patch('notifications/:userId/:companyId')
  updateNotifications(
    @Param('userId') userId: number,
    @Param('companyId') companyId: number,
    @Body() updateUserCompanyFollowingDto: UpdateUserCompanyFollowingDto,
  ) {
    return this.userCompanyFollowingService.updateNotifications(userId, companyId, updateUserCompanyFollowingDto);
  }

  // Endpoint pour arrêter de suivre une entreprise (DELETE /user-company-following/unfollow/:userId/:companyId)
  @Delete('unfollow/:userId/:companyId')
  unfollowCompany(@Param('userId') userId: number, @Param('companyId') companyId: number) {
    return this.userCompanyFollowingService.unfollowCompany(userId, companyId);
  }

  // Endpoint pour obtenir toutes les entreprises suivies par un utilisateur (GET /user-company-following/:userId)
  @Get(':userId')
  getFollowingCompanies(@Param('userId') userId: number) {
    return this.userCompanyFollowingService.getFollowingCompanies(userId);
  }
}
