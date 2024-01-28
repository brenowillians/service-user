import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { AddressType } from 'src/entities/address-type.entity';
import { UserAddress } from 'src/entities/user-address.entity';

export class CreateAddressTypeDto implements AddressType {

    @Exclude()
    idAddressType: number;
     
    @IsNotEmpty({message:"CAMPO DESCRIPTION OBRIGATÓRIO"})
    description: string ;
    
    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
    
    @Exclude()
    deletedDate: string;  
 
    @Exclude()     
    userAddresses: UserAddress[];

  }  
