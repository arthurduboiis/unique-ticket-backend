import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompanyFollowing } from './entities/user-company-following.entity';
import { CreateUserCompanyFollowingDto } from './dto/create-user-company-following.dto';
import { UpdateUserCompanyFollowingDto } from './dto/update-user-company-following.dto';

@Injectable()
export class UserCompanyFollowingService {
  constructor(
    @InjectRepository(UserCompanyFollowing)
    private readonly userCompanyFollowingRepository: Repository<UserCompanyFollowing>
  ) {}

  // Créer une relation "follow"
  async followCompany(createDto: CreateUserCompanyFollowingDto) {
    const { userId, companyId, notificationsEnabled } = createDto;
    const followEntry = this.userCompanyFollowingRepository.create({
      user: { id: userId },
      company: { id: companyId },
      notificationsEnabled,
    });
    return this.userCompanyFollowingRepository.save(followEntry);
  }

  // Mettre à jour l'état des notifications
  async updateNotifications(
    userId: number,
    companyId: number,
    updateDto: UpdateUserCompanyFollowingDto
  ) {
    return this.userCompanyFollowingRepository.update(
      { user: { id: userId }, company: { id: companyId } },
      { notificationsEnabled: updateDto.notificationsEnabled }
    );
  }
  async unfollowCompany(userId: number, companyId: number) {
    const result = await this.userCompanyFollowingRepository.delete({
      user: { id: userId },
      company: { id: companyId },
    });

    // Vérifier si une ligne a bien été supprimée
    if (result.affected === 0) {
      throw new Error('Relation non trouvée ou déjà supprimée');
    }

    return {
      message: `L'utilisateur ${userId} ne suit plus l'entreprise ${companyId}`,
    };
  }
  async getFollowingCompanies(userId: number) {
    const followingCompanies = await this.userCompanyFollowingRepository.find({
      where: { user: { id: userId } },
      relations: ['company'], // Charger les détails des entreprises
    });

    if (!followingCompanies.length) {
      throw new Error(`Aucune entreprise suivie par l'utilisateur ${userId}`);
    }

    return followingCompanies.map((follow) => follow.company);
  }
}
