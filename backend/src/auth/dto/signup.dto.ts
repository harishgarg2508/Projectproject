
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, min } from "class-validator"

export class SignUpDto {


    @IsString()
    username:string

    @IsOptional()
    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string



}