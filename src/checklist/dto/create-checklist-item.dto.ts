import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChecklistItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemName: string;
}
