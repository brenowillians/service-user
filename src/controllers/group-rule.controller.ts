import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupRuleService } from 'src/services/group-rule.service';
import { CreateGroupRuleDto } from 'src/dto/create-group-rule.dto';
import { UpdateGroupRuleDto } from 'src/dto/update-group-rule.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GroupRule } from 'src/entities/group-rule.entity';

@ApiTags('GroupRule') // Titulo Da Cadeia de Metodos
@Controller('group-rule')
export class GroupRuleController {
    
    constructor(private readonly groupRule: GroupRuleService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: GroupRule, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createGroupRuleDto: CreateGroupRuleDto) {
    return this.groupRule.create(createGroupRuleDto);
  }

  @ApiCreatedResponse({
    type: GroupRule, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.groupRule.findAll();
  }

  @ApiCreatedResponse({
    type: GroupRule, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupRule.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupRuleDto: UpdateGroupRuleDto) {
    return this.groupRule.update(+id, updateGroupRuleDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupRule.remove(+id);
  }

}
