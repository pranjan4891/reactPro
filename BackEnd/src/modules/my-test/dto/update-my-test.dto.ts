import { PartialType } from '@nestjs/mapped-types';
import { CreateMyTestDto } from './create-my-test.dto';

export class UpdateMyTestDto extends PartialType(CreateMyTestDto) {}
