import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { GroupStaff } from '../entities/group-staff.entity';
import { Staff } from 'src/entities/staff.entity';
import { Group } from 'src/entities/group.entity';

export class CreateGroupStaffDto implements GroupStaff {

    @Exclude()
    idGroupstaff: number;

    @IsNotEmpty({message:"CAMPO IDSTAFF OBRIGATÓRIO"})
    idStaff: number;

    @IsNotEmpty({message:"CAMPO IDGROUP OBRIGATÓRIO"})
    idGroup: number;

    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  

    @Exclude()
    idStaff2: Staff;

    @Exclude()
    idGroup2: Group

  }