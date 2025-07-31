import { IsBoolean, IsDate, IsOptional, IsString, Min, min } from "class-validator"

export class CreateUserDto {
    
    
        @IsString()
        name: string
    
        @IsString()
        email: string
    
        @IsString()
        @Min(3,{message:"must be atleast 3 character long"})
        password: string
    
       

    
    
}
