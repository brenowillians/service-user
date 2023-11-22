import { BoolBitTransformer } from "@averbach/nest-shared-utils";
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
import { Group } from "./group.entity";
import { Rule } from "./rule.entity";

  @Index("PK_GroupRule", ["idGroupRule"], { unique: true })

  @Entity("groupRule")
  export class GroupRule {
    @PrimaryGeneratedColumn({ type: "int", name: "id_grouprule" })
    idGroupRule: number;

    @Column("varchar", { name: "id_group" })
    idGroup: number;

    @Column("varchar", { name: "id_rule" })
    idRule: number;
      
    @Column("bit", { name: "is_allowed", transformer: new BoolBitTransformer })
    isAllowed: boolean;

    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  


    
    @ManyToOne(() => Group, (group) => group.groupRules)
    @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
    idGroup2: Group;

    
    @ManyToOne(() => Rule, (rule) => rule.groupRules)
    @JoinColumn([{ name: "id_rule", referencedColumnName: "idRule" }])
    idRule2: Rule;

  }


