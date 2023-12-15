import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRule } from 'src/entities/group-rule.entity';
import { CreateGroupRuleDto } from 'src/dto/create-group-rule.dto';
import { UpdateGroupRuleDto } from 'src/dto/update-group-rule.dto';
import { Repository } from 'typeorm';
import { Rule } from 'src/entities/rule.entity';
import { Group } from 'src/entities/group.entity';

@Injectable()
export class GroupRuleService {
    constructor(
      
        @InjectRepository(GroupRule) private groupRuleRepo: Repository<GroupRule>,
      ) {}
    
      async create(createGroupRuleDto: CreateGroupRuleDto) {
        
        const groupRule: GroupRule = this.groupRuleRepo.create(createGroupRuleDto);
        return await this.groupRuleRepo.save(groupRule); 
    
      }
    
      findAll() {
        return this.groupRuleRepo.find()
      }
    
      findOne(id: number) {
        return this.groupRuleRepo.findOne({where: {idGroupRule: id}})
      }
    
      update(id: number, updateGroupRuleDto: UpdateGroupRuleDto) {
        return this.groupRuleRepo.update(id, updateGroupRuleDto)
      }
    
      remove(id: number) {
        return this.groupRuleRepo.delete(id)
      }
    

}
