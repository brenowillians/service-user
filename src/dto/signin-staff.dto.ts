import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Staff } from 'src/entities/staff.entity';
import { GroupStaff } from 'src/entities/group-staff.entity';


export class SigninStaffDto{
    
    @IsNotEmpty({message:"CAMPO LOGIN OBRIGATÓRIO"})
    login: string;

    @IsNotEmpty({message:"CAMPO PASSWORD OBRIGATÓRIO"})
    password: string;
}