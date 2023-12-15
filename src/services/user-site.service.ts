import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSite } from 'src/entities/user-site.entity';
import { CreateUserSiteDto } from 'src/dto/create-user-site.dto';
import { UpdateUserSiteDto } from 'src/dto/update-user-site.dto';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { SigninUserSiteDto } from 'src/dto/signin-user-site.dto';



@Injectable()
export class UserSiteService {
        
    constructor(
        @InjectRepository(UserSite) private userSiteRepo: Repository<UserSite>,
      ) {}
    
      async create(createUserSiteDto: CreateUserSiteDto) {
        
        try{

        createUserSiteDto.password = await this.hashData(createUserSiteDto.password)
        const userSite: UserSite = this.userSiteRepo.create(createUserSiteDto);
        let result = await this.userSiteRepo.save(userSite); 

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
        return this.userSiteRepo.find()
      }
    
      findOne(id: number) {
        return this.userSiteRepo.findOne({where: {idUserSite: id}})
      }
    
      async update(id: number, updateUserSiteDto: UpdateUserSiteDto) {
        if(updateUserSiteDto.password){
          updateUserSiteDto.password = await this.hashData(updateUserSiteDto.password)
        }

        return this.userSiteRepo.update(id, updateUserSiteDto)
      }
    
      remove(id: number) {
        return this.userSiteRepo.delete(id)
      }

      private hashData(data: string) {
        return argon2.hash(data);
      }
  
      async signin(signinUserSiteDto: SigninUserSiteDto) {
        
        try{
  
          const user = await this.userSiteRepo.findOne({where: {login: signinUserSiteDto.login}})
  
          if(user){
            if(!user.locked){
                if (await argon2.verify(user.password, signinUserSiteDto.password)) {
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
