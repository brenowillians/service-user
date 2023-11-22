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
import { AdressType } from "./adress-type.entity";
import { UserSite } from "./user-site.entity";

  @Index("PK_UserAdress", ["idAdress"], { unique: true })

  @Entity("UserAdress")
  export class UserAdress {
    @PrimaryGeneratedColumn({ type: "int", name: "id_adress" })
    idAdress: number;

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

    @Column("int", { name: "id_adress_type" })
    idAdressType: number;

    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  


    @ManyToOne(() => AdressType, (adressType) => adressType.userAdresses)
    @JoinColumn([{ name: "id_adressType", referencedColumnName: "idAdressType" }])
    idAdressType2: AdressType;

    @ManyToOne(() => UserSite, (userSite) => userSite.userAdresses)
    @JoinColumn([{ name: "id_userSite", referencedColumnName: "idUserSite" }])
    idUserSite2: UserSite;


    

  }

