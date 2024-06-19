import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InternalAccountModule } from '../internal/account/account.module';
import { RedisModule } from '../config/redis/redis.module';

@Module({
  imports: [
    AuthModule,
    InternalAccountModule,
    ConfigModule.forRoot(),
    RedisModule,
  ],
})
export class AppModule {}
