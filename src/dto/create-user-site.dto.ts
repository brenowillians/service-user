import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { UserSite } from 'src/entities/user-site.entity';
import { UserAdress } from 'src/entities/user-adress.entity';


export class CreateUserSiteDto implements UserSite {

    @Exclude()
    idUserSite: number;
     
    @IsNotEmpty({message:"CAMPO LOGIN OBRIGATÓRIO"})
    login: string ;

    @IsNotEmpty({message:"CAMPO PASSWORD OBRIGATÓRIO"})
    password: string ;
  
    @IsOptional()
    @IsBoolean()
    locked: boolean | null;

    @IsNotEmpty({message:"CAMPO NAME OBRIGATÓRIO"})
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
      userAdresses: UserAdress[];
  
}