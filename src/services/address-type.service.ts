import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressType } from 'src/entities/address-type.entity';
import { CreateAddressTypeDto } from 'src/dto/create-address-type.dto';
import { UpdateAddressTypeDto } from 'src/dto/update-address-type.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaAddressTypeDto } from 'src/dto/list-criteria-address-type.dto';



@Injectable()
export class AddressTypeService {
    constructor(
        @InjectRepository(AddressType) private addressTypeRepo: Repository<AddressType>,
      ) {}
    
      async create(createAddressTypeDto: CreateAddressTypeDto) {
        
        const addressType: AddressType = this.addressTypeRepo.create(createAddressTypeDto);
        return await this.addressTypeRepo.save(addressType); 
    
      }
    
      findAll() {
        return this.addressTypeRepo.find()
      }
    
      findOne(id: number) {
        return this.addressTypeRepo.findOne({where: {idAddressType: id}})
      }
    
      update(id: number, updateAddressTypeDto: UpdateAddressTypeDto) {
        return this.addressTypeRepo.update(id, updateAddressTypeDto)
      }
    
      remove(id: number) {
        
        return this.addressTypeRepo.delete(id)
      }
    
      async list(data: ListCriteriaAddressTypeDto) {

        try{
            let criteria  = {}

              
            if (data.description)
              criteria["description"]= ILike('%' +data.description  + '%')
    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.addressTypeRepo.findAndCount(
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
