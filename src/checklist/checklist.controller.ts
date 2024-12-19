import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChecklistService } from './checklist.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import {
  CreateChecklistDto,
  CreateChecklistItemDto,
  UpdateChecklistItemStatusDto,
  RenameChecklistItemDto,
} from './dto';

@ApiTags('checklists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('checklists')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all checklists' })
  getAllChecklists(@Request() req) {
    return this.checklistService.getAllChecklists(req.user);
  }

  @Get(':checklistId')
  @ApiOperation({ summary: 'Get checklist by ID' })
  getChecklist(@Request() req, @Param('checklistId') checklistId: string) {
    return this.checklistService.getChecklist(req.user, checklistId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new checklist' })
  createChecklist(@Request() req, @Body() dto: CreateChecklistDto) {
    return this.checklistService.createChecklist(req.user, dto);
  }

  @Delete(':checklistId')
  @ApiOperation({ summary: 'Delete checklist' })
  deleteChecklist(@Request() req, @Param('checklistId') checklistId: string) {
    return this.checklistService.deleteChecklist(req.user, checklistId);
  }

  @Get(':checklistId/item')
  @ApiOperation({ summary: 'Get all items in a checklist' })
  getChecklistItems(@Request() req, @Param('checklistId') checklistId: string) {
    return this.checklistService.getChecklistItems(req.user, checklistId);
  }

  @Get(':checklistId/item/:checklistItemId')
  @ApiOperation({ summary: 'Get checklist item by ID' })
  getChecklistItemById(
    @Request() req,
    @Param('checklistId') checklistId: string,
    @Param('checklistItemId') checklistItemId: string,
  ) {
    return this.checklistService.getChecklistItemById(
      req.user,
      checklistId,
      checklistItemId,
    );
  }

  @Post(':checklistId/item')
  @ApiOperation({ summary: 'Create new checklist item' })
  createChecklistItem(
    @Request() req,
    @Param('checklistId') checklistId: string,
    @Body() dto: CreateChecklistItemDto,
  ) {
    return this.checklistService.createChecklistItem(
      req.user,
      checklistId,
      dto,
    );
  }

  @Put(':checklistId/item/:checklistItemId')
  @ApiOperation({ summary: 'Update checklist item status' })
  updateChecklistItemStatus(
    @Request() req,
    @Param('checklistId') checklistId: string,
    @Param('checklistItemId') checklistItemId: string,
    @Body() dto: UpdateChecklistItemStatusDto,
  ) {
    return this.checklistService.updateChecklistItemStatus(
      req.user,
      checklistId,
      checklistItemId,
      dto,
    );
  }

  @Put(':checklistId/item/rename/:checklistItemId')
  @ApiOperation({ summary: 'Rename checklist item' })
  renameChecklistItem(
    @Request() req,
    @Param('checklistId') checklistId: string,
    @Param('checklistItemId') checklistItemId: string,
    @Body() dto: RenameChecklistItemDto,
  ) {
    return this.checklistService.renameChecklistItem(
      req.user,
      checklistId,
      checklistItemId,
      dto,
    );
  }

  @Delete(':checklistId/item/:checklistItemId')
  @ApiOperation({ summary: 'Delete checklist item' })
  deleteChecklistItem(
    @Request() req,
    @Param('checklistId') checklistId: string,
    @Param('checklistItemId') checklistItemId: string,
  ) {
    return this.checklistService.deleteChecklistItem(
      req.user,
      checklistId,
      checklistItemId,
    );
  }
}
