import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, ...rest } = user;

      console.log({ rest });

      return rest;
    }

    return null;
  }

  async login(user: User) {
    console.log('call');
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    console.log({ access_token });

    return {
      access_token,
    };
  }
}
