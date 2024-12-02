/**
 * Service responsible for handling authentication-related operations.
 */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CrmUsersService } from '../crm_users/crm_users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  /**
   * Constructs an instance of AuthService.
   * 
   * @param {UsersService} usersService - Service to handle user-related operations.
   * @param {CrmUsersService} crmUsersService - Service to handle CRM user-related operations.
   * @param {JwtService} jwtService - Service to handle JWT operations.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly crmUsersService: CrmUsersService,
    private readonly jwtService: JwtService
  ) {}

  
  /**
   * Validates a user's credentials.
   *
   * @param email - The email address of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the user object without the password if validation is successful, or null if validation fails.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generates an access token for the given user.
   *
   * @param user - The user object containing user details.
   * @returns A JWT access token string.
   *
   * @remarks
   * The token includes the user's email, id, and a role of 'user'.
   * The token is set to expire in 15 minutes.
   */
  private generateAccessToken(user: any): string {
    const payload = { email: user.email, sub: user.id, role: 'user' };
    return this.jwtService.sign(payload, { expiresIn: '15m' }); // Durée de vie : 15 minutes
  }

  /**
   * Generates a refresh token for the given user.
   *
   * @private
   * @param {any} user - The user object containing user details.
   * @returns {string} - The generated refresh token.
   */
  private generateRefreshToken(user: any): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' }); // Durée de vie : 7 jours
  }

  /**
   * Logs in a user by generating an access token and a refresh token.
   *
   * @param user - The user object containing user details.
   * @returns An object containing the access token and refresh token.
   */
  async login(user: any) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: user,
    };
  }

  /**
   * Registers a new user by hashing their password and saving their details.
   * 
   * @param user - The user object containing user details.
   * @returns The created user object.
   * @throws ConflictException - If a user with the given email already exists.
   * @throws Error - If any other error occurs during the registration process.
   */
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

  /**
   * Refreshes the access token using the provided refresh token.
   *
   * @param {string} refreshToken - The refresh token to be used for generating a new access token.
   * @returns {Promise<{ access_token: string }>} - A promise that resolves to an object containing the new access token.
   * @throws {UnauthorizedException} - Throws an exception if the refresh token is invalid, expired, or if the user is not found.
   */
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOneByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      const accessToken = this.generateAccessToken(user);
      return { access_token: accessToken, user: user };
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }

  /**
   * Updates the password for a given user.
   *
   * @param user - The user object containing user details.
   * @param oldPassword - The current password of the user.
   * @param newPassword - The new password to be set.
   * @param confirmPassword - The confirmation of the new password.
   * @returns A promise that resolves to a string message if the password is successfully updated, or null otherwise.
   * @throws UnauthorizedException - If the old password is incorrect or the user is not found.
   */
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
