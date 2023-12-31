import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { UserSite } from 'src/entities/user-site.entity';
import { UserAddress } from 'src/entities/user-address.entity';


export class UpdateUserSiteDto implements UserSite {

    @Exclude()
    idUserSite: number;
     
    @IsOptional()
    login: string ;

    @IsOptional()
    password: string ;
  
    @IsOptional()
    @IsBoolean()
    locked: boolean | null;

    @IsOptional()
    name: string ;

    @IsOptional()
    birthday: string | null;
  
    @IsOptional()
    gender: string | null;

    @IsOptional()
    phone: string | null;

    @IsOptional()
    mobile: string | null;

    @IsOptional()
    id_number: string | null;

    @IsOptional()
    cpf: string | null;

    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  


    @Exclude()
      userAddresses: UserAddress[];
  
}