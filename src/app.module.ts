import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffController } from './controllers/staff.controller';
import { StaffService } from './services/staff.service';
import { AddressType } from './entities/address-type.entity';
import { GroupRule } from './entities/group-rule.entity';
import { GroupStaff } from './entities/group-staff.entity';
import { Group } from './entities/group.entity';
import { Rule } from './entities/rule.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserSite } from './entities/user-site.entity';
import { AddressTypeService } from './services/address-type.service';
import { AddressTypeController } from './controllers/address-type.controller';
import { GroupRuleService } from './services/group-rule.service';
import { GroupRuleController } from './controllers/group-rule.controller';
import { GroupStaffService } from './services/group-staff.service';
import { GroupStaffController } from './controllers/group-staff.controller';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { RuleService } from './services/rule.service';
import { RuleController } from './controllers/rule.controller';
import { UserAddressService } from './services/user-address.service';
import { UserAddressController } from './controllers/user-address.controller';
import { UserSiteService } from './services/user-site.service';
import { UserSiteController } from './controllers/user-site.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './services/auth-service/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'loja-users',
      username: 'postgres',
      password: '123456',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // never true in production!
    }),

    TypeOrmModule.forFeature([Staff, AddressType, GroupRule, GroupStaff, Group, Rule, UserAddress, UserSite]),
    PassportModule,
    JwtModule,
  ],
  controllers: [AppController, StaffController, AddressTypeController, GroupRuleController, GroupStaffController, GroupController, RuleController, UserAddressController, UserSiteController],
  providers: [
    AppService, 
    StaffService, 
    AddressTypeService, 
    GroupRuleService, 
    GroupStaffService, 
    GroupService, 
    RuleService,
    UserAddressService, 
    UserSiteService, 
    AccessTokenStrategy, 
    RefreshTokenStrategy
  ],
})
export class AppModule {}
