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
      throw new BadRequestException('User Inválido !'); 
    }

    const hasUser = await this.usersRepository.findOne({
      where: {username: createUserDto.username},
    });

    const addressArray = createUserDto.address;

    const contactArray = createUserDto.contact;

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

  async findOne(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(
      {where: {username} }
    );
    return user;
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
    console.log(contact)
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
