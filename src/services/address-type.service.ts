import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressType } from 'src/entities/address-type.entity';
import { CreateAddressTypeDto } from 'src/dto/create-address-type.dto';
import { UpdateAddressTypeDto } from 'src/dto/update-address-type.dto';
import { Repository } from 'typeorm';
import { UserAddress } from 'src/entities/user-address.entity';



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
    
}
