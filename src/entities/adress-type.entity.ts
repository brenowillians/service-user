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
import { UserAdress } from "./user-adress.entity";


  @Index("PK_AdressType", ["idAdressType"], { unique: true })

  @Entity("AdressType")
  export class AdressType {
    @PrimaryGeneratedColumn({ type: "int", name: "id_adress_type" })
    idAdressType: number;
     
    @Column("varchar", { name: "description"})
    description: string ;
    
    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
    
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  
 
    @OneToMany(
      () => UserAdress,
      (userAdress) => userAdress.idAdressType2
    )

    userAdresses: UserAdress[];

  }  



