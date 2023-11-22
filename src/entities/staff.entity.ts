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
import { GroupStaff } from "./group-staff.entity";


  @Index("PK_Staff", ["idStaff"], { unique: true })

  @Entity("staff")
  export class Staff {
    @PrimaryGeneratedColumn({ type: "int", name: "id_staff" })
    idStaff: number;

    @Column("varchar", { name: "name"})
    name: string;
  
    @Column("varchar", { name: "login" })
    login: string;

    @Column("varchar", { name: "password"})
    password: string;
  
    @Column("bit", { name: "active", nullable:true, transformer: new BoolBitTransformer })
    active: boolean | null;

    @Column("bit", { name: "locked", nullable:true, transformer: new BoolBitTransformer })
    locked: boolean | null;

    @Column("varchar", { name: "sector"})
    sector: string;

    @Column("varchar", { name: "role" })
    role: string;

    @Column("varchar", { name: "id_number" })
    id_number: string;

    @Column("varchar", { name: "cpf"})
    cpf: string;

    @Column("varchar", { name: "ctps", nullable:true})
    ctps: string | null;

    @Column("varchar", { name: "phone", nullable:true})
    phone: string | null;

    @Column("varchar", { name: "mobile", nullable:true })
    mobile: string | null;

    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  

    @OneToMany(
      () => GroupStaff,
      (groupStaff) => groupStaff.idStaff2
    )

    groupStaffs: GroupStaff[];

  }
