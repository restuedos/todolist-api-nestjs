import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checklist } from '../entities/checklist.entity';
import { ChecklistItem } from '../entities/checklist-item.entity';
import { User } from '../entities/user.entity';
import {
  CreateChecklistDto,
  CreateChecklistItemDto,
  RenameChecklistItemDto,
} from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepository: Repository<Checklist>,
    @InjectRepository(ChecklistItem)
    private readonly checklistItemRepository: Repository<ChecklistItem>,
  ) {}

  async getAllChecklists(user: User) {
    return this.checklistRepository.find({
      where: { user: { id: user.id } },
      relations: ['items'],
    });
  }

  async getChecklist(user: User, checklistId: string) {
    const checklist = await this.checklistRepository.findOne({
      where: { id: checklistId, user: { id: user.id } },
      relations: ['items'],
    });

    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }

    return checklist;
  }

  async createChecklist(user: User, dto: CreateChecklistDto) {
    const checklist = this.checklistRepository.create({
      ...dto,
      user: plainToClass(User, user),
    });

    return this.checklistRepository.save(checklist);
  }

  async deleteChecklist(user: User, checklistId: string) {
    await this.verifyChecklistOwnership(user.id, checklistId);

    const checklist = await this.checklistRepository.findOne({
      where: { id: checklistId },
      relations: ['items'],
    });

    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }

    if (checklist.items && checklist.items.length > 0) {
      await this.checklistItemRepository.remove(checklist.items); // Assuming you have a repository for checklist items
    }

    await this.checklistRepository.remove(checklist);
    return { message: 'Checklist deleted successfully' };
  }

  async getChecklistItems(user: User, checklistId: string) {
    await this.verifyChecklistOwnership(user.id, checklistId);
    return this.checklistItemRepository.find({
      where: { checklist: { id: checklistId } },
    });
  }

  async getChecklistItemById(user: User, checklistId: string, itemId: string) {
    await this.verifyChecklistOwnership(user.id, checklistId);
    const item = await this.checklistItemRepository.findOne({
      where: { id: itemId, checklist: { id: checklistId } },
    });

    if (!item) {
      throw new NotFoundException('Checklist item not found');
    }

    return item;
  }

  async createChecklistItem(
    user: User,
    checklistId: string,
    dto: CreateChecklistItemDto,
  ) {
    const checklist = await this.verifyChecklistOwnership(user.id, checklistId);
    const item = this.checklistItemRepository.create({
      ...dto,
      checklist,
    });

    return this.checklistItemRepository.save(item);
  }

  async updateChecklistItemStatus(
    user: User,
    checklistId: string,
    itemId: string,
  ) {
    await this.verifyChecklistOwnership(user.id, checklistId);
    const item = await this.checklistItemRepository.findOne({
      where: { id: itemId, checklist: { id: checklistId } },
    });

    if (!item) {
      throw new NotFoundException('Checklist item not found');
    }

    item.status = !item.status;
    return this.checklistItemRepository.save(item);
  }

  async renameChecklistItem(
    user: User,
    checklistId: string,
    itemId: string,
    dto: RenameChecklistItemDto,
  ) {
    await this.verifyChecklistOwnership(user.id, checklistId);
    const item = await this.checklistItemRepository.findOne({
      where: { id: itemId, checklist: { id: checklistId } },
    });

    if (!item) {
      throw new NotFoundException('Checklist item not found');
    }

    item.title = dto.title;
    return this.checklistItemRepository.save(item);
  }

  async deleteChecklistItem(user: User, checklistId: string, itemId: string) {
    await this.verifyChecklistOwnership(user.id, checklistId);
    const item = await this.checklistItemRepository.findOne({
      where: { id: itemId, checklist: { id: checklistId } },
    });

    if (!item) {
      throw new NotFoundException('Checklist item not found');
    }

    await this.checklistItemRepository.remove(item);
    return { message: 'Checklist item deleted successfully' };
  }

  private async verifyChecklistOwnership(userId: string, checklistId: string) {
    const checklist = await this.checklistRepository.findOne({
      where: { id: checklistId, user: { id: userId } },
    });

    if (!checklist) {
      throw new ForbiddenException('Access denied');
    }

    return checklist;
  }
}
