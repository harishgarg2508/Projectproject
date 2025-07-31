import { IsNumber, IsString } from "class-validator"

export class Paginate{
    @IsString()
    keyword:string
    @IsNumber()
    skip:number
    @IsNumber()
    take:number
}