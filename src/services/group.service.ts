import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaGroupDto } from 'src/dto/list-criteria-group.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepo: Repository<Group>,
      ) {}
    
      async create(createGroupDto: CreateGroupDto) {
        
        const group: Group = this.groupRepo.create(createGroupDto);
        return await this.groupRepo.save(group); 
    
      }
    
      findAll() {
        return this.groupRepo.find()
      }
    
      findOne(id: number) {
        return this.groupRepo.findOne({where: {idGroup: id}})
      }
    
      update(id: number, updateGroupDto: UpdateGroupDto) {
        return this.groupRepo.update(id, updateGroupDto)
      }
    
      remove(id: number) {
        return this.groupRepo.delete(id)
      }

      async list(data: ListCriteriaGroupDto) {

        try{
            let criteria  = {}

              
            if (data.name)
              criteria["name"]= ILike('%' +data.name  + '%')
    
            if (data.isAdmin){
              criteria["isAdmin"]= true
            }
            else{
              if(data.isAdmin == false){
                criteria["isAdmin"]= false
              }
            }
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.groupRepo.findAndCount(
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
