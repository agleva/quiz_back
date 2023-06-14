import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnknownException } from '../services/exceptions/unknown.exception';
import { httpResponse } from '../services/interfaces/http-response.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.usersService.create(createUserDto);
      return httpResponse(
        'Usuário cadastrado com sucesso !',
        data
      )
    } catch (error : any) {
      throw new UnknownException(error.message)
    }
  }

  @Get()
  async findAll() {
    try {
      return httpResponse(
        'Usuários buscados com sucesso !',
        await this.usersService.findAll()
      )
    } catch (error: any) {
      throw new UnknownException(error.message)
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    try {
      return httpResponse(
        'Usuário buscados com sucesso !',
        await this.usersService.findUserById(+id)
      )
    } catch (error: any) {
      throw new UnknownException(error.message)
    }
  }

  @Get('getByUsername/:username')
  async findOne(@Param('username') username: string) {
    try {
      return httpResponse(
        'Usuário buscados com sucesso !',
        await this.usersService.findOne(username)
      )
    } catch (error: any) {
      throw new UnknownException(error.message)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return httpResponse(
        'Usuário atualizado com sucesso !',
        await this.usersService.update(+id, updateUserDto)
      )
    } catch (error: any) {
      throw new UnknownException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return httpResponse(
        'Usuário deletado com sucesso !',
        await this.usersService.remove(+id)
      )
    } catch (error: any) {
      throw new UnknownException(error.message)
    }
  }
}
