import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { CreateStaffDto } from 'src/dto/create-staff.dto';
import { UpdateStaffDto } from 'src/dto/update-staff.dto';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { SigninStaffDto } from 'src/dto/signin-staff.dto';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private staffRepo: Repository<Staff>,
      ) {}
    
    async create(createStaffDto: CreateStaffDto) {
      
      try{
        createStaffDto.password = await this.hashData(createStaffDto.password)
        const staff: Staff = this.staffRepo.create(createStaffDto);
        let result = await this.staffRepo.save(staff); 
 
        if(result){
          delete result.password
          return result
        }
        else{
          return null
        }   
 
      }
      catch(error){
        throw error
      }

    }
  
    findAll() {
      return this.staffRepo.find()
    }
  
    findOne(id: number) {
      return this.staffRepo.findOne({where: {idStaff: id}})
    }
  
    async update(id: number, updateStaffDto: UpdateStaffDto) {
      if(updateStaffDto.password){
        updateStaffDto.password = await this.hashData(updateStaffDto.password)
      }
      return this.staffRepo.update(id, updateStaffDto)
    }
  
    remove(id: number) {
    
      return this.staffRepo.delete(id)
    }
    
    
    private hashData(data: string) {
      return argon2.hash(data);
    }

    async signin(signinStaffDto: SigninStaffDto) {
      
      try{

        const user = await this.staffRepo.findOne({where: {login: signinStaffDto.login}})

        if(user){
          if(user.active && !user.locked){
              if (await argon2.verify(user.password, signinStaffDto.password)) {
                return true
              } else {
                throw "Invalid user or password"
              }
          }
          else{
            throw "Invalid user or password"  
          }
        }
        else{
          throw "Invalid user or password"
        }
    
      }
      catch(error){
        throw error
      }

    }
}
