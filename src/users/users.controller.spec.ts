import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmSqliteTestingModule } from '../services/TypeORMSqliteTestingModule';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../services/filters/http-exception.filter';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as request from 'supertest';

const user = {
  name: "Teste",
      username: "teste",
      password: "12345",
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
};

const userUpdate = {
  name: "Teste update",
      username: "teste",
      password: "12345",
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
};

describe('UsersController', () => {
  let controller: UsersController;
  let usersRepository: Repository<UserEntity>
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmSqliteTestingModule(),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = module.createNestApplication();
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<UsersController>(UsersController);
    usersRepository = module.get('UserEntityRepository');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('(POST) Should create an user', async () => {
    await request(app.getHttpServer())
    .post('/users')
    .send(user)
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Usuário cadastrado com sucesso !');
      expect(response.body.data.name).toBe('Teste');
    })
  })

  it('(POST) Should not create an user', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'create')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .post('/users')
    .send(user)
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })

  it('(GET) Should findall users', async () => {
    await request(app.getHttpServer())
    .get('/users')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Usuários buscados com sucesso !');
    })
  })

  it('(GET) Should not findall users', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'findAll')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .get('/users')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })

  it('(GET) Should findOneById user', async () => {
    await request(app.getHttpServer())
    .get('/users/1')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Usuário buscados com sucesso !');
    })
  })

  it('(GET) Should not findOneById user', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'findUserById')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .get('/users/1')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })

  it('(GET) Should findOneByUsername user', async () => {
    await request(app.getHttpServer())
    .get('/users/getByUsername/teste')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Usuário buscados com sucesso !');
    })
  })

  it('(GET) Should not findOneByUsername user', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'findOne')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .get('/users/getByUsername/teste')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })
  
  it('(GET) Should update user', async () => {
    await request(app.getHttpServer())
    .patch('/users/1')
    .send(userUpdate)
    .then((response) => {
      console.log(response.body.data)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Usuário atualizado com sucesso !');
    })
  })

  it('(GET)  Should not update user', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'update')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .patch('/users/1')
    .send(userUpdate)
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })

  it('(GET) Should delete user', async () => {
    await request(app.getHttpServer())
    .delete('/users/1')
    .then((response) => {
      console.log(response.body.data)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Usuário deletado com sucesso !');
    })
  })

  it('(GET)  Should not delete user', async () => {

    const spy = jest
      .spyOn(UsersService.prototype, 'remove')
      .mockImplementation(() => {
        throw new Error('Invalid request');
      })

    await request(app.getHttpServer())
    .delete('/users/1')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.body.message).toBe('Erro desconhecido (4): Invalid request');
      expect(response.body.statusCode).toBe(502);
    })
  })

});
