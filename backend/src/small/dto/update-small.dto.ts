import { PartialType } from '@nestjs/mapped-types';
import { CreateSmallDto } from './create-small.dto';

export class UpdateSmallDto extends PartialType(CreateSmallDto) {}
