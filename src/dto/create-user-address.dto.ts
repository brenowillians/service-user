import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { AddressType } from 'src/entities/address-type.entity';
import { UserSite } from 'src/entities/user-site.entity';
import { UserAddress } from 'src/entities/user-address.entity';


 
  export class CreateUserAddressDto implements UserAddress {
    
    @Exclude()
    idAddress: number;

    @IsNotEmpty({message:"CAMPO IDUSER OBRIGATÓRIO"})
    idUser: number;

    @IsNotEmpty({message:"CAMPO STREET OBRIGATÓRIO"})
    street: string ;
      
    @IsNotEmpty({message:"CAMPO NUMBER OBRIGATÓRIO"})
    number: string ;

    @IsNotEmpty({message:"CAMPO ZIPCODE OBRIGATÓRIO"})
    zipCode: string ;

    @IsNotEmpty({message:"CAMPO CITY OBRIGATÓRIO"})
    city: string ;

    @IsNotEmpty({message:"CAMPO STATE OBRIGATÓRIO"})
    state: string ;

    @IsNotEmpty({message:"CAMPO COUNTRY OBRIGATÓRIO"})
    country: string ;

    @IsNotEmpty({message:"CAMPO IDADDRESSTYPE OBRIGATÓRIO"})
    idAddressType: number;

    
    @Exclude()
    createdDate: string;
     
    @Exclude()
    updatedDate: string;
     
    @Exclude()
    deletedDate: string;  


    @Exclude()
    idAddressType2: AddressType;

    @Exclude()
    idUserSite2: UserSite;


    

  }



