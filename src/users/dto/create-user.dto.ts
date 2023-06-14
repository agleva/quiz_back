import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, IsDate } from "class-validator";
import { CreateUserAddressDto } from "./address.dto";
import { CreateUserContactDto } from "./contact.dto";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @Type(() => CreateUserAddressDto)
    @IsArray()
    address: [CreateUserAddressDto]
    
    @Type(() => CreateUserContactDto)
    @IsArray()
    contact: [CreateUserContactDto]

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
    
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}
