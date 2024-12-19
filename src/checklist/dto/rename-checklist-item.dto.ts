import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenameChecklistItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemName: string;
}
