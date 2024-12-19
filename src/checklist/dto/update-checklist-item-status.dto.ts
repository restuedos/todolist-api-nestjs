import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChecklistItemStatusDto {
  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;
}