import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddressEntity } from './entities/address.entity';
import { UserContactEntity } from './entities/contact.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserAddressEntity)
    private readonly usersAddressRepository: Repository<UserAddressEntity>,
    @InjectRepository(UserContactEntity)
    private readonly usersContactRepository: Repository<UserContactEntity>,
  ){}
 
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    createUserDto.createdAt = new Date(Date.now());
    createUserDto.updatedAt = new Date(Date.now());

    if(!createUserDto) {
      throw new BadRequestException('Usuário Inválido !'); 
    }

    const hasUser = await this.usersRepository.findOne({
      where: {username: createUserDto.username},
    });

    if(hasUser) {
      throw new BadRequestException('Usuário já inserido !'); 
    }

    const addressArray: any[] = createUserDto.address;

    const contactArray: any[] = createUserDto.contact;

    const address: UserAddressEntity[] = await Promise.all(
      addressArray.map((el: any) => this.preloadAddress(el))
    ) 

    const contact: UserContactEntity[] = await Promise.all(
      contactArray.map((el: any) => this.preloadContact(el))
    ) 

    const data = this.usersRepository.save({
      ...createUserDto,
      address,
      contact
    });

    return data;
  }

  async findAll(): Promise<UserEntity[]>{
    const users = await this.usersRepository.find(
      { relations: ['address', 'contact'] }
    );
   
    return users;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(
      {where: {id}, relations: ['address', 'contact'] }
    );
    return user;
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOne(
      {where: {username}}
    )

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hasUser = await this.usersRepository.findOne({
      where: {id}
    });

    if(!hasUser) {
      throw new BadRequestException('Usuário inexistente !'); 
    }

    updateUserDto.updatedAt = new Date(Date.now());

    const addressArray: any[] = updateUserDto.address;

    const contactArray: any[] = updateUserDto.contact;

    const address: UserAddressEntity[] = await Promise.all(
      addressArray?.map((address: any) => this.preloadAddress(address))
    ) 

    const contact: UserContactEntity[] = await Promise.all(
      contactArray?.map((contact: any) => this.preloadContact(contact))
    ) 

    const data = this.usersRepository.save({
      id: id,
      name: updateUserDto.name,
      username: updateUserDto.username,
      address: address,
      contact: contact
    });

    return data;

  }

  async remove(id: number) {
    const hasUser = await this.usersRepository.findOne({
      where: {id}
    });

    if(!hasUser) {
      throw new BadRequestException('Usuário inexistente !'); 
    }
    return this.usersRepository.remove(hasUser);
  }

  private async preloadAddress(address: any): Promise<UserAddressEntity> {
    const hasAddress = await this.usersAddressRepository.findOne({
      where: {cep: address.cep},
    });

    if(hasAddress) {
      return hasAddress;
    }

    return this.usersAddressRepository.save({
      ...address,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    })

  }
  
  private async preloadContact(contact: any): Promise<UserContactEntity> {
    const hasContact = await this.usersContactRepository.findOne({
      where: {email: contact.email},
    });

    if(hasContact) {
      return hasContact;
    }

    return this.usersContactRepository.save({
      ...contact,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    })

  }

}
