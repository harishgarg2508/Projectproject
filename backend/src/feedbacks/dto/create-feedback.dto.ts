import { IsArray, IsEnum, IsString } from "class-validator";
import { Status } from "../entities/feedback.entity";

export class CreateFeedbackDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(Status)
    status: Status


    @IsArray()
    @IsString({ each: true })
    tagNames: string[];



}
