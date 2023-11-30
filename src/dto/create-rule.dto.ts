import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Rule } from 'src/entities/rule.entity';
import { GroupRule } from 'src/entities/group-rule.entity';

export class CreateRuleDto implements Rule {

    @Exclude()
    idRule: number;
     
    @IsNotEmpty({message:"CAMPO DESCRIPTION OBRIGATÓRIO"})
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