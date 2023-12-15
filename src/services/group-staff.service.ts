import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupStaff } from 'src/entities/group-staff.entity';
import { CreateGroupStaffDto } from 'src/dto/create-group-staff.dto';
import { UpdateGroupStaffDto } from 'src/dto/update-group-staff.dto';
import { Repository } from 'typeorm';


@Injectable()
export class GroupStaffService {
    constructor(
        @InjectRepository(GroupStaff) private groupStaffRepo: Repository<GroupStaff>,
      ) {}
    
      async create(createGroupStaffDto: CreateGroupStaffDto) {
        
        const groupStaff: GroupStaff = this.groupStaffRepo.create(createGroupStaffDto);
        return await this.groupStaffRepo.save(groupStaff); 
    
      }
    
      findAll() {
        return this.groupStaffRepo.find()
      }
    
      findOne(id: number) {
        return this.groupStaffRepo.findOne({where: {idGroupstaff: id}})
      }
    
      update(id: number, updateGroupStaffDto: UpdateGroupStaffDto) {
        return this.groupStaffRepo.update(id, updateGroupStaffDto)
      }
    
      remove(id: number) {
        return this.groupStaffRepo.delete(id)
      }

}
