import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    content: string

    @IsNumber()
    feedback_id: number

    @IsNumber()
    @IsOptional()
    parent_id?: number


}
