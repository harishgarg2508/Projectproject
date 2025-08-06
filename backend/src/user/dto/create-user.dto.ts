import { IsBoolean, IsDate, IsEnum, IsOptional, IsString, Min, min } from "class-validator"
import { Role } from "../entities/user.entity"

export class CreateUserDto {
    
    
        @IsString()
        username: string
    
        @IsString()
        email: string
    
        @IsString()
        @Min(3,{message:"must be atleast 3 character long"})
        password: string
    
       @IsEnum(Role)
       @IsOptional()
       role: Role

    
    
}
