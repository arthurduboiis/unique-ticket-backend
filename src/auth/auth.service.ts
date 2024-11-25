import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CrmUsersService } from '../crm_users/crm_users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly crmUsersService: CrmUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, isCrmUser: boolean): Promise<any> {
    const user = isCrmUser 
      ? await this.crmUsersService.findOneByEmail(email)
      : await this.usersService.findOneByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, isCrmUser: boolean) {
    const payload = { email: user.email, sub: user.id, role: isCrmUser ? 'crm_user' : 'user' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any, isCrmUser: boolean) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (isCrmUser) {
      return this.crmUsersService.create({
        ...user,
        password: hashedPassword,
      });
    } else {
      return this.usersService.create({
        ...user,
        password: hashedPassword,
      });
    }
  }

  // async updatePassword(user: any, newPassword: string, oldPassword: string, isCrmUser: boolean) {
  //   const userToCheck = isCrmUser 
  //     ? await this.crmUsersService.findOneByEmail(user.email)
  //     : await this.usersService.findOneByEmail(user.email);

  //   if (userToCheck && await bcrypt.compare(oldPassword, userToCheck.password)) {
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  //     if (isCrmUser) {
  //       return this.crmUsersService.updatePassword(user.email, hashedPassword);
  //     } else {
  //       return this.usersService.updatePassword(user.email, hashedPassword);
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  // async resetPassword(email: string, newPassword: string, isCrmUser: boolean) {
  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   if (isCrmUser) {
  //     return this.crmUsersService.resetPassword(email, hashedPassword);
  //   } else {
  //     return this.usersService.resetPassword(email, hashedPassword);
  //   }
  // }

}
