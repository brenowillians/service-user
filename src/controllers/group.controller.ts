import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupService } from 'src/services/group.service';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Group } from 'src/entities/group.entity';
import { ListCriteriaGroupDto } from 'src/dto/list-criteria-group.dto';


@ApiTags('Group') // Titulo Da Cadeia de Metodos
@Controller('group')
export class GroupController {
    
    
    
    constructor(private readonly group: GroupService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: Group, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.group.create(createGroupDto);
  }

  @ApiCreatedResponse({
    type: Group, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.group.findAll();
  }

  @ApiCreatedResponse({
    type: Group, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.group.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.group.update(+id, updateGroupDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.group.remove(+id);
  }

  @ApiCreatedResponse({
    type: Group, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaGroupDto: ListCriteriaGroupDto) {
    return this.group.list(listCriteriaGroupDto);
  }

}
