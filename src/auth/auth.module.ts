import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../services/guards/auth.guard';
import { UserAddressEntity } from '../users/entities/address.entity';
import { UserContactEntity } from '../users/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserAddressEntity,
      UserContactEntity
    ]),
    JwtModule.register({
      global: false,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
  ]
})
export class AuthModule {}
