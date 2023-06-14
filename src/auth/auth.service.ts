import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginException } from '../services/exceptions/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}


  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new LoginException('Username ou Password incorretos !');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
