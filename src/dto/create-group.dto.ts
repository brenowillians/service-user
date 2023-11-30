import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Group } from 'src/entities/group.entity';
import { GroupStaff } from 'src/entities/group-staff.entity';
import { GroupRule } from 'src/entities/group-rule.entity';

export class CreateGroupDto implements Group {

     @Exclude()
    idGroup: number;

    @IsNotEmpty({message:"CAMPO NAME OBRIGATÓRIO"})
    name: string ;
      
    @IsOptional()
    @IsBoolean()
    isAdmin: boolean | null;

    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  
    

    
    @Exclude()
    groupStaffs: GroupStaff[];


    @Exclude()
    groupRules: GroupRule[];

  }