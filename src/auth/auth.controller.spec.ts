import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmSqliteTestingModule } from '../services/TypeORMSqliteTestingModule';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../services/filters/http-exception.filter';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  let usersRepository: Repository<UserEntity>
  let access_token: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({imports: [
      ...TypeOrmSqliteTestingModule(),
      JwtModule.register({
        global: false,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      })
    ],      
    controllers: [AuthController],
    providers: [AuthService, UsersService],
    }).compile();

    app = module.createNestApplication();
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<AuthController>(AuthController);
    usersRepository = module.get('UserEntityRepository');

    conecta();
  });

  const conecta = async () => {
    await usersRepository.insert({
        name: "Teste",
        username: "teste",
        password: "12345678",
        address: [
            {
                cep: "99999-999",
                street: "Av. Teste",
                neighborhood: "Lot. Teste",
                number: 999,
                city: "Teste",
                state: "Alagoas",
                country: "Brasil"
            }
        ],
        contact: [
            {
                email: "teste@gmail.com",
                phone1: "(99) 9 9999-9999",
                phone2: "(88) 8 8888-8888"
            }
        ]
    })
  }

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('(POST) should successfull login', async () => {
    await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      username: "teste",
      password: "12345678"
    })
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
      access_token = response.body.access_token;
    })
  })

  it('(POST) should login failed', async () => {
    await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      username: "teste",
      password: "1234567"
    })
    .then((response) => {
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Erro de autenticação (2): Username ou Password incorretos !');
      expect(response.body.statusCode).toBe(401);
    })
  })

  it('(POST) should successfull profile ', async () => {
    await request(app.getHttpServer())
    .get('/auth/profile')
    .set('Authorization', 'Bearer ' + access_token)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.sub).toBe(1);
      expect(response.body.username).toBe('teste');
    })
  })
});
