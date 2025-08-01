import { PartialType } from '@nestjs/mapped-types';
import { CreateLargeDto } from './create-large.dto';

export class UpdateLargeDto extends PartialType(CreateLargeDto) {}
