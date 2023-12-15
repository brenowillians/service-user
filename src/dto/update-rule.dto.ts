import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Rule } from 'src/entities/rule.entity';
import { GroupRule } from 'src/entities/group-rule.entity';

export class UpdateRuleDto implements Rule {

    @Exclude()
    idRule: number;
     
    @IsOptional()
    description: string ;
    
    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  

    
    @Exclude()
    groupRules: GroupRule[];



  }  