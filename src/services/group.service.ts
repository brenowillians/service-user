import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepo: Repository<Group>,
      ) {}
    
      async create(createGroupDto: CreateGroupDto) {
        
        const group: Group = this.groupRepo.create(createGroupDto);
        return await this.groupRepo.save(group); 
    
      }
    
      findAll() {
        return this.groupRepo.find()
      }
    
      findOne(id: number) {
        return this.groupRepo.findOne({where: {idGroup: id}})
      }
    
      update(id: number, updateGroupDto: UpdateGroupDto) {
        return this.groupRepo.update(id, updateGroupDto)
      }
    
      remove(id: number) {
        return this.groupRepo.delete(id)
      }


}
