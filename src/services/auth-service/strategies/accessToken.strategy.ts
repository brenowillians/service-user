import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StaffService } from 'src/services/staff.service';
import { UserSiteService } from 'src/services/user-site.service';

type JwtPayload = {
  source: string;
  idUser: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userSiteService: UserSiteService,
    private staffService: StaffService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async validate(payload: JwtPayload) {

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
    return payload;
  }
}