import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { Checklist } from '../entities/checklist.entity';
import { ChecklistItem } from '../entities/checklist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist, ChecklistItem])],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}
