import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChecklistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
