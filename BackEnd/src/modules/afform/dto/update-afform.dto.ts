import { PartialType } from '@nestjs/mapped-types';
import { CreateAfformDto } from './create-afform.dto';

export class UpdateAfformDto extends PartialType(CreateAfformDto) {}
