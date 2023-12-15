import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
import { UserAddress } from "./user-address.entity";
import { CreateAddressTypeDto } from "src/dto/create-address-type.dto";


  @Index("PK_AddressType", ["idAddressType"], { unique: true })

  @Entity("addresstype")
  export class AddressType {

    @PrimaryGeneratedColumn({ type: "int", name: "id_address_type" })
    idAddressType: number;
     
    @Column("varchar", { name: "description"})
    description: string ;
    
    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
    
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  
 
    @OneToMany(
      () => UserAddress,
      (userAddress) => userAddress.idAddressType2
    )

    userAddresses: UserAddress[];

  }  



