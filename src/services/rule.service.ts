import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from 'src/entities/rule.entity';
import { CreateRuleDto } from 'src/dto/create-rule.dto';
import { UpdateRuleDto } from 'src/dto/update-rule.dto';
import { Repository } from 'typeorm';

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


}
