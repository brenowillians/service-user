import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupStaffService } from 'src/services/group-staff.service';
import { CreateGroupStaffDto } from 'src/dto/create-group-staff.dto';
import { UpdateGroupStaffDto } from 'src/dto/update-group-staff.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GroupStaff } from 'src/entities/group-staff.entity';
import { ListCriteriaGroupStaffDto } from 'src/dto/list-criteria-group-staff.dto';


@ApiTags('GroupStaff') // Titulo Da Cadeia de Metodos
@Controller('group-staff')
export class GroupStaffController {
    
    
    constructor(private readonly groupStaff: GroupStaffService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: GroupStaff, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createClienteDto: CreateGroupStaffDto) {
    return this.groupStaff.create(createClienteDto);
  }

  @ApiCreatedResponse({
    type: GroupStaff, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.groupStaff.findAll();
  }

  @ApiCreatedResponse({
    type: GroupStaff, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupStaff.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateGroupStaffDto) {
    return this.groupStaff.update(+id, updateClienteDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupStaff.remove(+id);
  }

  @ApiCreatedResponse({
    type: GroupStaff, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaGroupStaffDto: ListCriteriaGroupStaffDto) {
    return this.groupStaff.list(listCriteriaGroupStaffDto);
  }

}
