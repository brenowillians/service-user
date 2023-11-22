
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
import { Staff } from "./staff.entity";
import { Group } from "./group.entity";


  @Index("PK_GroupStaff", ["idGroupstaff"], { unique: true })

  @Entity("groupstaff")
  export class GroupStaff {
    @PrimaryGeneratedColumn({ type: "int", name: "id_groupstaff" })
    idGroupstaff: number;

    @Column("int", { name: "id_staff"})
    idStaff: number;

    @Column("int", { name: "id_group"})
    idGroup: number;

    @CreateDateColumn({ type: 'timestamptz', precision: 3 })
    createdDate: string;
     
    @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
    updatedDate: string;
     
    @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
    deletedDate: string;  

    @ManyToOne(() => Staff, (staff) => staff.groupStaffs)
    @JoinColumn([{ name: "id_staff", referencedColumnName: "idStaff" }])
    idStaff2: Staff;

    @ManyToOne(() => Group, (group) => group.groupStaffs)
    @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
    idGroup2: Group

  }


