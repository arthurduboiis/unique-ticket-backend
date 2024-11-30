import { Controller, Post, Patch, Body, UseGuards, Req, Res, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnexionDto } from './dto/connexion.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

/**
 * Controller for handling authentication-related operations.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  /**
   * Handles user login.
   * 
   * @param body - The login credentials.
   * @param res - The response object with passthrough enabled.
   * @returns A promise that resolves to the login result or an error message if authentication fails.
   * 
   * @remarks
   * This method validates the user's email and password. If the credentials are correct, it proceeds with the login process.
   * If the credentials are incorrect, it returns a 401 status with an error message.
   */
  async login(@Body() body: ConnexionDto, @Res({passthrough: true}) res: Response) {
    const { email, password } = body;
    const emailLowerCase = email.toLowerCase();
    const user = await this.authService.validateUser(emailLowerCase, password);
    
    if (!user) {
      return res.status(401).send({ message: 'Email ou mot de passe incorrect.' });
    }

    return this.authService.login(user);
  }

  @Post('register')
  /**
   * Registers a new user with the provided email and password.
   * Converts the email to lowercase before registration.
   * If registration is successful, logs in the user.
   * Handles errors such as duplicate user email and other registration errors.
   *
   * @param body - The connection data transfer object containing email and password.
   * @param res - The response object with passthrough enabled.
   * @returns The result of the login process if registration is successful.
   * @throws ConflictException if the email is already registered.
   * @throws BadRequestException for other registration errors.
   */
  async register(@Body() body: ConnexionDto, @Res({passthrough: true}) res: Response) {
    const { email, password } = body;
    const emailLowerCase = email.toLowerCase();

    try {
      const user = await this.authService.register({ emailLowerCase, password });
      return this.authService.login(user);
    }
    catch (error) {
      if(error instanceof ConflictException) {
        return res.status(409).send({ message: error.message }); 
      }
      return res.status(400).send({ message: 'Erreur lors de l\'inscription.' });
    }

  }

  @Post('refresh')
  /**
   * Refreshes the authentication token.
   *
   * @param {string} refreshToken - The refresh token provided by the client.
   * @returns {Promise<any>} - A promise that resolves to the new authentication token.
   */
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  /**
   * Changes the password of the authenticated user.
   * 
   * @param req - The request object containing the authenticated user's information.
   * @param oldPassword - The current password of the user.
   * @param newPassword - The new password to be set.
   * @param confirmPassword - The confirmation of the new password.
   * @returns A promise that resolves with the result of the password update operation.
   */
  async changePassword(
    @Req() req: any,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @Body('confirmPassword') confirmPassword: string
  ) {
    const user = req.user;
    return this.authService.updatePassword(user, oldPassword, newPassword, confirmPassword);
  }
}
