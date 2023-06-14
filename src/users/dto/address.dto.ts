import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserAddressDto {
    @IsString()
    @IsNotEmpty()
    cep: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
