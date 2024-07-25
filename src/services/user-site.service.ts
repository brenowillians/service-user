import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSite } from 'src/entities/user-site.entity';
import { CreateUserSiteDto } from 'src/dto/create-user-site.dto';
import { UpdateUserSiteDto } from 'src/dto/update-user-site.dto';
import { Repository, ILike } from 'typeorm';
import * as argon2 from 'argon2';
import { SigninUserSiteDto } from 'src/dto/signin-user-site.dto';
import { JwtService } from '@nestjs/jwt';
import { ListCriteriaUserSiteDto } from 'src/dto/list-criteria-user-site.dto';



@Injectable()
export class UserSiteService {
        
    constructor(
        @InjectRepository(UserSite) private userSiteRepo: Repository<UserSite>,
        private jwtService: JwtService,

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
  
          const user = await this.userSiteRepo.findOne(
            {
              where: {login: signinUserSiteDto.login},
              relations: {userAddresses: true}
            })
  
          if(user){
            if(!user.locked){
                if (await argon2.verify(user.password, signinUserSiteDto.password)) {

                  delete user.password

                  const tokens = await this.getTokens(user)

                  return { user, ...tokens}
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

    private async getTokens(userSite: UserSite) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            source: "user",
            idUser: userSite.idUserSite
          },
          {
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '60m',
          },
        ),

        this.jwtService.signAsync(
          {
            source: "user",
            idUser: userSite.idUserSite
          },
          {
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: "180m",
          },
        ),
      ]);
  
      return {
        accessToken,
        refreshToken,
      };
    }
  
    async refreshTokens(idUserSite: number){
      
      try{
   
        const userSiteResponse = await this.findOne(idUserSite)
        if(!userSiteResponse || userSiteResponse.locked){
          throw new HttpException({data: null,}, HttpStatus.UNAUTHORIZED);    
        }
  
        
        const tokens = await this.getTokens(userSiteResponse);
        
        
        return {
            status: 200,
            data: tokens,
            message:'Tokens Refreshed',
            error: null
        }
    }
    catch(error){
        
        return {
            status: 400,
            data: null,
            message:error.message,
            error: error.stack
        }            
    }        
    }

    async list(data: ListCriteriaUserSiteDto) {

      try{
          let criteria  = {}

            
          if (data.name)
            criteria["name"]= ILike('%' +data.name  + '%')

          if (data.cpf)
            criteria["cpf"]= ILike('%' +data.cpf  + '%')

          if (data.gender)
            criteria["gender"]= ILike('%' +data.gender  + '%')

          if (data.login)
            criteria["login"]= ILike('%' +data.login  + '%')
  
          if (data.mobile)
            criteria["mobile"]= ILike('%' +data.mobile  + '%')

          if (data.phone)
            criteria["phone"]= ILike('%' +data.phone  + '%')

          const take= data.items || 10
          const page= data.page || 1;
          const skip= (page-1) * take ;
  
          const [result, total] = await this.userSiteRepo.findAndCount(
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
