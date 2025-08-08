import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

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
    // @Type(() => Number)
    tagIds?: number[];



    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
        }
        return value;
    })
    @IsArray()
    @IsString({ each: true })
    authorIds?: string[];

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