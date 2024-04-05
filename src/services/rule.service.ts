import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from 'src/entities/rule.entity';
import { CreateRuleDto } from 'src/dto/create-rule.dto';
import { UpdateRuleDto } from 'src/dto/update-rule.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaRuleDto } from 'src/dto/list-criteria-rule.dto';

@Injectable()
export class RuleService {
    constructor(
        @InjectRepository(Rule) private ruleRepo: Repository<Rule>,
      ) {}
    
      async create(createRuleDto: CreateRuleDto) {
        
        const rule: Rule = this.ruleRepo.create(createRuleDto);
        return await this.ruleRepo.save(rule); 
    
      }
    
      findAll() {
        return this.ruleRepo.find()
      }
    
      findOne(id: number) {
        return this.ruleRepo.findOne({where: {idRule: id}})
      }
    
      update(id: number, updateRuleDto: UpdateRuleDto) {
        return this.ruleRepo.update(id, updateRuleDto)
      }
    
      remove(id: number) {
        return this.ruleRepo.delete(id)
      }

      async list(data: ListCriteriaRuleDto) {

        try{
            let criteria  = {}

              
            if (data.description)
              criteria["description"]= ILike('%' +data.description  + '%')
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.ruleRepo.findAndCount(
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
