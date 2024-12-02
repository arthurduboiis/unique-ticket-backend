import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CrmUsersService } from '../crm_users/crm_users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly crmUsersService: CrmUsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private generateAccessToken(user: any): string {
    const payload = { email: user.email, sub: user.id, role: 'user' };
    return this.jwtService.sign(payload, { expiresIn: '15m' }); // Durée de vie : 15 minutes
  }

  private generateRefreshToken(user: any): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' }); // Durée de vie : 7 jours
  }

  async login(user: any) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: user,
    };
  }

  async register(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(user);
    try {
      const existingUser = await this.usersService.findOneByEmail(user.emailLowerCase);
      if (existingUser) {
        throw new ConflictException(
          'Un utilisateur avec cet email existe déjà.'
        );
      }

      const userCreated = await this.usersService.create({
        email: user.emailLowerCase,
        password: hashedPassword,
      });

      return userCreated;
    } catch (error) {
      if(error instanceof ConflictException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      // Vérifie la validité du Refresh Token
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOneByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      // Génère un nouveau Access Token
      const accessToken = this.generateAccessToken(user);
      return { access_token: accessToken, user: user };
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }

  async updatePassword(user: any, oldPassword: string, newPassword: string, confirmPassword: string): Promise<string | null> {
    const userToCheck = await this.usersService.findOneByEmail(user.email);

    if (userToCheck && (await bcrypt.compare(oldPassword, userToCheck.password))) {  
      return this.usersService.changePassword(userToCheck.id, oldPassword, newPassword, confirmPassword);
    } else {
      throw new UnauthorizedException('Ancien mot de passe incorrect ou utilisateur non trouvé');
    }
  }
  

  // async resetPassword(email: string, newPassword: string, isCrmUser: boolean) {
  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   if (isCrmUser) {
  //     return this.crmUsersService.resetPassword(email, hashedPassword);
  //   } else {
  //     return this.usersService.resetPassword(email, hashedPassword);
  //   }
  // }
}
