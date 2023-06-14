import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserAddressEntity } from './entities/address.entity';
import { UserContactEntity } from './entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserAddressEntity,
      UserContactEntity
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
