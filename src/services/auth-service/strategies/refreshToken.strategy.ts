import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserSiteService } from 'src/services/user-site.service';
import { StaffService } from 'src/services/staff.service';

type JwtPayload = {
  source: string;
  idUser: number;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private userSiteService: UserSiteService,
    private staffService: StaffService,

  ) 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  
  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    switch(payload.source){
      case "user":
          const userSite = await this.userSiteService.findOne(payload.idUser)
          if(!userSite || userSite.locked){
            throw new HttpException({data: null,}, HttpStatus.UNAUTHORIZED);    
          }
        break;
      case "staff":
        const userStaff = await this.staffService.findOne(payload.idUser)
        if(!userStaff || userStaff.locked){
          throw new HttpException({data: null,}, HttpStatus.UNAUTHORIZED);    
        }
        break;
      default:
        throw new HttpException({data: null,}, HttpStatus.UNAUTHORIZED);      
    }  

    
    return { ...payload, refreshToken };
  }
}