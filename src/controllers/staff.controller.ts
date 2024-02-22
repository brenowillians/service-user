import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StaffService } from 'src/services/staff.service';
import { CreateStaffDto } from 'src/dto/create-staff.dto';
import { UpdateStaffDto } from 'src/dto/update-staff.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Staff } from 'src/entities/staff.entity';
import { SigninStaffDto } from 'src/dto/signin-staff.dto';


@ApiTags('Staff') // Titulo Da Cadeia de Metodos
@Controller('staff')
export class StaffController {
        
        
    
    constructor(private readonly staff: StaffService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  

  @ApiCreatedResponse({
    type: Staff, // aqui definimos o tipo de resposta
  }) 

  @Post('signin')
  signin(@Body() signinStaffDto: SigninStaffDto) {
    return this.staff.signin(signinStaffDto);
  }


  @ApiCreatedResponse({
    type: Staff, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staff.create(createStaffDto);
  }

  @ApiCreatedResponse({
    type: Staff, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.staff.findAll();
  }

  @ApiCreatedResponse({
    type: Staff, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staff.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atualizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staff.update(+id, updateStaffDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staff.remove(+id);
  }

}
