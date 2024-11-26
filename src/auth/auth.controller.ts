import { Controller, Post, Body, Request, Res, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnexionDto } from './dto/connexion.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
  async register(@Body() body: ConnexionDto, @Res({passthrough: true}) res: Response) {
    const { email, password } = body;
    const emailLowerCase = email.toLowerCase();

    try {
      const user = await this.authService.register({ emailLowerCase, password });
      return this.authService.login(user);
    }
    catch (error) {
      // if duplicate user email error
      if(error instanceof ConflictException) {
        return res.status(409).send({ message: error.message }); 
      }
      return res.status(400).send({ message: 'Erreur lors de l\'inscription.' });
    }

  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
