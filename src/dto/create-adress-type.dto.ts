import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { AdressType } from 'src/entities/adress-type.entity';
import { UserAdress } from 'src/entities/user-adress.entity';

export class CreateAdressTypeDto implements AdressType {

    @Exclude()
    idAdressType: number;
     
    @IsNotEmpty({message:"CAMPO DESCRIPTION OBRIGATÓRIO"})
    description: string ;
    
    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
    
    @Exclude()
    deletedDate: string;  
 
    @Exclude()
      
    userAdresses: UserAdress[];

  }  
