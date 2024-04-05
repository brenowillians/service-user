import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RuleService } from 'src/services/rule.service';
import { CreateRuleDto } from 'src/dto/create-rule.dto';
import { UpdateRuleDto } from 'src/dto/update-rule.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Rule } from 'src/entities/rule.entity';
import { ListCriteriaRuleDto } from 'src/dto/list-criteria-rule.dto';

@ApiTags('Rule') // Titulo Da Cadeia de Metodos
@Controller('rule')
export class RuleController {
    
    
    
    
    constructor(private readonly rule: RuleService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: Rule, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rule.create(createRuleDto);
  }

  @ApiCreatedResponse({
    type: Rule, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.rule.findAll();
  }

  @ApiCreatedResponse({
    type: Rule, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rule.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rule.update(+id, updateRuleDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rule.remove(+id);
  }

  @ApiCreatedResponse({
    type: Rule, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaRuleDto: ListCriteriaRuleDto) {
    return this.rule.list(listCriteriaRuleDto);
  }

}
