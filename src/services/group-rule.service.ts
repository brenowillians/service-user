import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRule } from 'src/entities/group-rule.entity';
import { CreateGroupRuleDto } from 'src/dto/create-group-rule.dto';
import { UpdateGroupRuleDto } from 'src/dto/update-group-rule.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaGroupRuleDto } from 'src/dto/list-criteria-group-rule.dto';

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
    
      async list(data: ListCriteriaGroupRuleDto) {

        try{
            let criteria  = {}

              
            if (data.idGroup)
              criteria["idGroup"]= data.idGroup
            
            if (data.idRule)
              criteria["idRule"]= data.idRule
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.groupRuleRepo.findAndCount(
                {
                    where: criteria,
                    order: data.order,
                    take: take,
                    skip: skip
                }
            );
    
            if(!result || result.length===0){
                throw new NotFoundException('nothing to show'); 
            }
    
    
            return {
                status: 200,
                data: {result: result, total: total},
                message:'list in data.result and total in data.total',
                error: null
            }
        }
        catch(error){
            if(error instanceof NotFoundException){            
                return {
                    status: 404,
                    data: null,
                    message:error.message,
                    error: error.message
                }
            }
    
            return {
                status: 400,
                data: null,
                message:error.message,
                error: error.stack
            }           
        }    
        
      }    
}
