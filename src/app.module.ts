import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import ORMConfig from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    TypeOrmModule.forFeature([]),
    AuthModule,
    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
