import { Transform, Type } from "class-transformer";
import {  IsArray, IsEnum, IsNumber, IsOptional } from "class-validator";

export enum OrderBy {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class FeedbackFilterDto {
    @IsOptional()
    search?: string;

    @IsOptional()
    status?: string;

    @IsOptional()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',').map((v) => parseInt(v, 10)) : value,
    )
    @IsArray()
    @Type(() => Number)
    tagIds?: number[];

    @IsOptional()
    @Type(() => Number)
    tagId?: number;
    
    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;

    @IsEnum(OrderBy)
    @IsOptional()
    orderBy?: OrderBy;
}