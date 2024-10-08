import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from 'src/entities/user-address.entity';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';
import { Repository, ILike } from 'typeorm';
import { ListCriteriaUserAddressDto } from 'src/dto/list-criteria-user-address.dto';


@Injectable()
export class UserAddressService {
    
    constructor(
        @InjectRepository(UserAddress) private userAddressRepo: Repository<UserAddress>,
      ) {}
    
      async create(createUserAddressDto: CreateUserAddressDto) {
        
        await this.updateOtherUserAddress(createUserAddressDto)

        const userAddress: UserAddress = this.userAddressRepo.create(createUserAddressDto);
        return await this.userAddressRepo.save(userAddress); 
    
      }
    
      findAll() {
        return this.userAddressRepo.find()
      }
    
      findOne(id: number) {
        return this.userAddressRepo.findOne({where: {idAddress: id}})
      }
    
      async update(id: number, updateUserAddressDto: UpdateUserAddressDto) {

        await this.updateOtherUserAddress(updateUserAddressDto)

        return  await this.userAddressRepo.update(id, updateUserAddressDto)
      }
    
      remove(id: number) {
        return this.userAddressRepo.delete(id)
      }

      async list(data: ListCriteriaUserAddressDto) {
        try{
            let criteria  = {}

              
            if (data.idUser)
              criteria["idUser"]= data.idUser

    
            const take= data.items || 10
            const page= data.page || 1;
            const skip= (page-1) * take ;
    
            const [result, total] = await this.userAddressRepo.findAndCount(
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
      
      async updateOtherUserAddress(userAddressDto: UpdateUserAddressDto) : Promise<void>{
        if(userAddressDto.primary==1){
          const resultOtherAddress =  await this.userAddressRepo.find({
            where: { 
              idUserSite: userAddressDto.idUserSite,
              primary:1
            }
          })
          if(resultOtherAddress && resultOtherAddress.length>0 ){
            for(const updateOtherAddress  of resultOtherAddress){
              updateOtherAddress.primary=0
              const updatedId = updateOtherAddress.idAddress
              delete updateOtherAddress.idAddress
              delete updateOtherAddress.createdDate
              delete updateOtherAddress.updatedDate
              delete updateOtherAddress.deletedDate
              await this.userAddressRepo.update(updatedId, updateOtherAddress)  // update other address to make primary=0
            }
          }
  
        }
      }
}
