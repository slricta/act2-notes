import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// JWT authentication strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // Initialize the JWT strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
// Validate the JWT payload
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
