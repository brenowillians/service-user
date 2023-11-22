import {IsBoolean,  IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { Staff } from 'src/entities/staff.entity';
import { GroupStaff } from 'src/entities/group-staff.entity';


export class UpdateStaffDto implements Staff {
    
    @Exclude()
    idStaff: number;

    @IsOptional()
    name: string;

    @IsOptional()
    login: string;

    @IsOptional()
    password: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;

    @IsOptional()
    @IsBoolean()
    locked: boolean;


    @IsOptional()
    sector: string;

    @IsOptional()
    role: string;

    @IsOptional()
    id_number: string;

    @IsOptional()
    cpf: string;

    @IsOptional()
    ctps: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    mobile: string;
    
    @Exclude()
    createdDate: string;
    @Exclude()
    updatedDate: string;
    @Exclude()
    deletedDate: string;
    
    @Exclude()
    groupStaffs: GroupStaff[];   
}