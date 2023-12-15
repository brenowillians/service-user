import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from 'src/entities/user-address.entity';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';
import { Repository } from 'typeorm';


@Injectable()
export class UserAddressService {
    
    constructor(
        @InjectRepository(UserAddress) private userAddressRepo: Repository<UserAddress>,
      ) {}
    
      async create(createUserAddressDto: CreateUserAddressDto) {
        
        const userAddress: UserAddress = this.userAddressRepo.create(createUserAddressDto);
        return await this.userAddressRepo.save(userAddress); 
    
      }
    
      findAll() {
        return this.userAddressRepo.find()
      }
    
      findOne(id: number) {
        return this.userAddressRepo.findOne({where: {idAddress: id}})
      }
    
      update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
        return this.userAddressRepo.update(id, updateUserAddressDto)
      }
    
      remove(id: number) {
        return this.userAddressRepo.delete(id)
      }

}
