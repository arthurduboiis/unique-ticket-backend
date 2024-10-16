import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Request() req) {
    const { email, password, isCrmUser } = body;
    const user = await this.authService.validateUser(email, password, isCrmUser);
    
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user, isCrmUser);
  }
}
