import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupStaff } from 'src/entities/group-staff.entity';
import { CreateGroupStaffDto } from 'src/dto/create-group-staff.dto';
import { UpdateGroupStaffDto } from 'src/dto/update-group-staff.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaGroupStaffDto } from 'src/dto/list-criteria-group-staff.dto';


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

          
      async list(data: ListCriteriaGroupStaffDto) {

        try{
            let criteria  = {}

              
            if (data.idGroup)
              criteria["idGroup"]= data.idGroup
            
            if (data.idStaff)
              criteria["idStaff"]= data.idStaff
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.groupStaffRepo.findAndCount(
                {
                    where: criteria,
                    order: data.order,
                    take: take,
                    skip: skip
                }
            );
    
            if(!result || result.length===0){
                throw new NotFoundException('nothing to show'); 
            }
    
    
            return {
                status: 200,
                data: {result: result, total: total},
                message:'list in data.result and total in data.total',
                error: null
            }
        }
        catch(error){
            if(error instanceof NotFoundException){            
                return {
                    status: 404,
                    data: null,
                    message:error.message,
                    error: error.message
                }
            }
    
            return {
                status: 400,
                data: null,
                message:error.message,
                error: error.stack
            }           
        }    
        
      }   
}
