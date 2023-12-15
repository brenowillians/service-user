import { BoolBitTransformer } from "@averbach/nest-shared-utils";

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


  @Index("PK_UserSite", ["idUserSite"], { unique: true })

  @Entity("usersite")
  export class UserSite {
    @PrimaryGeneratedColumn({ type: "int", name: "id_userSite" })
    idUserSite: number;
     
    @Column("varchar", { name: "login"})
    login: string ;

    @Column("varchar", { name: "password" })
    password: string ;
  
    @Column("bit", { name: "locked", nullable:true, transformer: new BoolBitTransformer })
    locked: boolean | null;

    @Column("varchar", { name: "name" })
    name: string ;

    @Column({ type: 'timestamptz', nullable:true, precision: 3 })
    birthday: string | null;
  
    @Column("varchar", { name: "gender", nullable:true })
    gender: string | null;

    @Column("varchar", { name: "phone", nullable:true })
    phone: string | null;

    @Column("varchar", { name: "mobile", nullable:true})
    mobile: string | null;

    @Column("varchar", { name: "id_number", nullable:true })
    id_number: string | null;

    @Column("varchar", { name: "cpf" })
    cpf: string ;

    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  


    @OneToMany(
      () => UserAddress,
      (userAddress) => userAddress.idUserSite2
    )
    userAddresses: UserAddress[];
  }  
