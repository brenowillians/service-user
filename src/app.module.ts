import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { AdressType } from './entities/adress-type.entity';
import { GroupRule } from './entities/group-rule.entity';
import { GroupStaff } from './entities/group-staff.entity';
import { Group } from './entities/group.entity';
import { Rule } from './entities/rule.entity';
import { UserAdress } from './entities/user-adress.entity';
import { UserSite } from './entities/user-site.entity';
import { AdressTypeService } from './adress-type.service';
import { AdressTypeController } from './adress-type.controller';
import { GroupRuleService } from './group-rule.service';
import { GroupRuleController } from './group-rule.controller';
import { GroupStaffService } from './group-staff.service';
import { GroupStaffController } from './group-staff.controller';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { UserAdressService } from './user-adress.service';
import { UserAdressController } from './user-adress.controller';
import { UserSiteService } from './user-site.service';
import { UserSiteController } from './user-site.controller';

@Module({
  imports: [
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

    TypeOrmModule.forFeature([Staff, AdressType, GroupRule, GroupStaff, Group, Rule, UserAdress, UserSite]),

  ],
  controllers: [AppController, StaffController, AdressTypeController, GroupRuleController, GroupStaffController, GroupController, RuleController, UserAdressController, UserSiteController],
  providers: [AppService, StaffService, AdressTypeService, GroupRuleService, GroupStaffService, GroupService, RuleService, UserAdressService, UserSiteService],
})
export class AppModule {}
