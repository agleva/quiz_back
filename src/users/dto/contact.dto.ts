import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserContactDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone1: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone2?: string;
}
