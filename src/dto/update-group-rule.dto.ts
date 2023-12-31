import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { GroupRule } from 'src/entities/group-rule.entity';
import { Group } from 'src/entities/group.entity';
import { Rule } from 'src/entities/rule.entity';


export class UpdateGroupRuleDto implements GroupRule {

    @Exclude()
    idGroupRule: number;

    @IsOptional()
    idGroup: number;

    @IsOptional()
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
