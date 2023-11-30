import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { GroupRule } from 'src/entities/group-rule.entity';
import { Group } from 'src/entities/group.entity';
import { Rule } from 'src/entities/rule.entity';


export class CreateGroupRuleDto implements GroupRule {

    @Exclude()
    idGroupRule: number;

    @IsNotEmpty({message:"CAMPO IDGROUP OBRIGATÓRIO"})
    idGroup: number;

    @IsNotEmpty({message:"CAMPO IDRULE OBRIGATÓRIO"})
    idRule: number;
      
    @IsOptional()
    @IsBoolean()
    isAllowed: boolean;

    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  

    
    @Exclude()

    idGroup2: Group;

    
    @Exclude()
    
    idRule2: Rule;

  }
