import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, IsDate, IsOptional } from "class-validator";
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
    @IsOptional()
    password?: string;

    @Type(() => CreateUserAddressDto)
    @IsArray()
    address: [CreateUserAddressDto]
    
    @Type(() => CreateUserContactDto)
    @IsArray()
    contact: [CreateUserContactDto]

    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    createdAt?: Date;
    
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    updatedAt?: Date;
}
