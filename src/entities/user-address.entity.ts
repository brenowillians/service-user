import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { AddressType } from "./address-type.entity";
import { UserSite } from "./user-site.entity";

  @Index("PK_UserAddress", ["idAddress"], { unique: true })

  @Entity("useraddress")
  export class UserAddress {
    @PrimaryGeneratedColumn({ type: "int", name: "id_address" })
    idAddress: number;

    @Column("int", { name: "id_user" })
    idUser: number;

    @Column("varchar", { name: "street" })
    street: string ;
      
    @Column("varchar", { name: "number" })
    number: string ;

    @Column("varchar", { name: "zip_code" })
    zipCode: string ;

    @Column("varchar", { name: "city" })
    city: string ;

    @Column("varchar", { name: "state" })
    state: string ;

    @Column("varchar", { name: "country" })
    country: string ;

    @Column("int", { name: "id_address_type" })
    idAddressType: number;

    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  


    @ManyToOne(() => AddressType, (addressType) => addressType.userAddresses, {
      onDelete: "CASCADE"
    })
    @JoinColumn([{ name: "id_addressType", referencedColumnName: "idAddressType" }])
    idAddressType2: AddressType;

    @ManyToOne(() => UserSite, (userSite) => userSite.userAddresses, {
        onDelete: "CASCADE"
    })
    @JoinColumn([{ name: "id_userSite", referencedColumnName: "idUserSite" }])
    idUserSite2: UserSite;


    

  }

