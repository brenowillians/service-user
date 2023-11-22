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
import { GroupRule } from "./group-rule.entity";


  @Index("PK_Rule", ["idRule"], { unique: true })

  @Entity("Rule")
  export class Rule {
    @PrimaryGeneratedColumn({ type: "int", name: "id_rule" })
    idRule: number;
     
    @Column("varchar", { name: "description"})
    description: string ;
    
    
    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  


    @OneToMany(
      () => GroupRule,
      (groupRule) => groupRule.idRule2
    )

    groupRules: GroupRule[];



  }  

