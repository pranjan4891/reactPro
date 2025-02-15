import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../modules/user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'XYDJKHDHHDKHDDHHDKHFJHGFJHGGJHS',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.id); // Assuming payload.id contains the user ID
    if (!user) {
      throw new UnauthorizedException({ msg: 'User not found' });
    }
    return user;
  }
}
