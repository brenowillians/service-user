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
import { GroupRule } from "./group-rule.entity";

  @Index("PK_Group", ["idGroup"], { unique: true })

  @Entity("group")
  export class Group {
    @PrimaryGeneratedColumn({ type: "int", name: "id_group" })
    idGroup: number;

    @Column("varchar", { name: "name" })
    name: string ;
      
    @Column("bit", { name: "is_admin",nullable:true, transformer: new BoolBitTransformer })
    isAdmin: boolean | null;

    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  
    


    
    @OneToMany(
      () => GroupStaff,
      (groupStaff) => groupStaff.idGroup2
    )

    groupStaffs: GroupStaff[];


    @OneToMany(
      () => GroupRule,
      (groupRule) => groupRule.idGroup2
    )

    groupRules: GroupRule[];

  }