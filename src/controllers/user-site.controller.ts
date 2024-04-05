import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserSiteService } from 'src/services/user-site.service';
import { CreateUserSiteDto } from 'src/dto/create-user-site.dto';
import { UpdateUserSiteDto } from 'src/dto/update-user-site.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserSite } from 'src/entities/user-site.entity';
import { SigninUserSiteDto } from 'src/dto/signin-user-site.dto';
import { ListCriteriaUserSiteDto } from 'src/dto/list-criteria-user-site.dto';


@ApiTags('UserSite') // Titulo Da Cadeia de Metodos
@Controller('user-site')
export class UserSiteController {
            
    
    constructor(private readonly userSite: UserSiteService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: UserSite, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createUserSiteDto: CreateUserSiteDto) {
    return this.userSite.create(createUserSiteDto);
  }

  @ApiCreatedResponse({
    type: UserSite, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.userSite.findAll();
  }

  @ApiCreatedResponse({
    type: UserSite, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSite.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSiteDto: UpdateUserSiteDto) {
    return this.userSite.update(+id, updateUserSiteDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSite.remove(+id);
  }

  @ApiCreatedResponse({
    type: UserSite, // aqui definimos o tipo de resposta
  }) 
  @Post('signin')
  signin(@Body() signinUserSiteDto: SigninUserSiteDto) {
    return this.userSite.signin(signinUserSiteDto);
  }

  @ApiCreatedResponse({
    type: UserSite, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaUserSiteDto: ListCriteriaUserSiteDto) {
    return this.userSite.list(listCriteriaUserSiteDto);
  }
}
