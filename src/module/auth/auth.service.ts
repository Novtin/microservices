import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalAccountService } from '../../internal/account/account.service';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto, RefreshJwtDto } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REDIS_TOKEN) private readonly redis: Redis,
    private readonly accountServiceInternal: InternalAccountService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async makeTokens(payload: {
    login: string;
    userId: string;
  }): Promise<JwtDto> {
    const access = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_ACCESS_EXP'),
    });

    const refresh = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_REFRESH_EXP'),
    });

    return {
      access,
      refresh,
    };
  }

  async login(params: SignInDto): Promise<JwtDto> {
    const isPasswordCorrect =
      await this.accountServiceInternal.verification(params);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }
    let userId = await this.redis.get(params.login);
    if (!userId) {
      const users = await this.accountServiceInternal.getUsersByFilter({
        logins: [params.login],
      });
      userId = users.items[0].userId;
      await this.redis.set(params.login, userId);
    }
    const payload = { login: params.login, userId: userId };
    return this.makeTokens(payload);
  }

  async refreshToken(params: RefreshJwtDto): Promise<JwtDto> {
    let jwtPayload: {
      userId: string;
      login: string;
    };
    try {
      jwtPayload = this.jwtService.verify(params.refresh, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        algorithms: [this.config.get('JWT_ALG')],
      });
    } catch (error: unknown) {
      throw new UnauthorizedException();
    }
    const { items: users } = await this.accountServiceInternal.getUsersByFilter(
      {
        logins: [jwtPayload.login],
      },
    );
    if (!users.length) {
      throw new NotFoundException('User not found');
    }
    const payload = { login: users[0].login, userId: users[0].userId };
    return this.makeTokens(payload);
  }
}
