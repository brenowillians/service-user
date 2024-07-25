import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {Exclude} from 'class-transformer';
import { AddressType } from 'src/entities/address-type.entity';
import { UserSite } from 'src/entities/user-site.entity';
import { UserAddress } from 'src/entities/user-address.entity';


 
  export class UpdateUserAddressDto implements UserAddress {
    
    @Exclude()
    idAddress: number;

    @IsOptional()
    idUserSite: number;

    @IsOptional()
    street: string ;
      
    @IsOptional()
    number: string ;

    @IsOptional()
    zipCode: string ;

    @IsOptional()
    city: string ;

    @IsOptional()
    state: string ;

    @IsOptional()
    country: string ;

    @IsOptional()
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

