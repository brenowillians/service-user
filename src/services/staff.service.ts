import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { CreateStaffDto } from 'src/dto/create-staff.dto';
import { UpdateStaffDto } from 'src/dto/update-staff.dto';
import { Repository, ILike } from 'typeorm';
import * as argon2 from 'argon2';
import { SigninStaffDto } from 'src/dto/signin-staff.dto';
import { JwtService } from '@nestjs/jwt';
import { ListCriteriaStaffDto } from 'src/dto/list-criteria-staff.dto';


@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private staffRepo: Repository<Staff>,
        private jwtService: JwtService,
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

        const user = await this.staffRepo.findOne(
          {
            where: {login: signinStaffDto.login},
            relations: {
              groupStaffs:{
                idGroup2:{
                  groupRules: {
                    idRule2: true
                  }
                }
              }
            }
          }
        )

        if(user){
          if(user.active && !user.locked){
              if (await argon2.verify(user.password, signinStaffDto.password)) {
                
                delete user.password

                const tokens = await this.getTokens(user)

                return { user, ...tokens}
                
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

    private async getTokens(staff: Staff) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            source: "staff",
            idUser: staff.idStaff
          },
          {
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '60m',
          },
        ),

        this.jwtService.signAsync(
          {
            source: "staff",
            idUser: staff.idStaff
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
  
    async refreshTokens(idStaff: number){
      
      try{
   
        const staffResponse = await this.findOne(idStaff)
        if(!staffResponse || staffResponse.locked){
          throw new HttpException({data: null,}, HttpStatus.UNAUTHORIZED);    
        }
  
        
        const tokens = await this.getTokens(staffResponse);
        
        
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

    async list(data: ListCriteriaStaffDto) {

      try{
          let criteria  = {}

            
          if (data.login)
            criteria["login"]= ILike('%' +data.login  + '%')

          if (data.name)
            criteria["name"]= ILike('%' +data.name  + '%')

          if (data.active){
            criteria["active"]= true
          }
          else{
            if(data.active == false){
              criteria["active"]= false
            }
          }          

          const take= data.items || 10
          const page= data.page || 1;
          const skip= (page-1) * take ;
  
          const [result, total] = await this.staffRepo.findAndCount(
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
