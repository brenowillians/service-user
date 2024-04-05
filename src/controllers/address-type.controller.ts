import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AddressTypeService } from 'src/services/address-type.service';
import { CreateAddressTypeDto } from 'src/dto/create-address-type.dto';
import { UpdateAddressTypeDto } from 'src/dto/update-address-type.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AddressType } from 'src/entities/address-type.entity';
import { ListCriteriaAddressTypeDto } from 'src/dto/list-criteria-address-type.dto';


@ApiTags('AddressType') // Titulo Da Cadeia de Metodos
@Controller('address-type')
export class AddressTypeController {
    constructor(private readonly addressType: AddressTypeService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: AddressType, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createAddressTypeDto: CreateAddressTypeDto) {
    return this.addressType.create(createAddressTypeDto);
  }

  @ApiCreatedResponse({
    type: AddressType, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.addressType.findAll();
  }

  @ApiCreatedResponse({
    type: AddressType, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressType.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressTypeDto: UpdateAddressTypeDto) {
    return this.addressType.update(+id, updateAddressTypeDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressType.remove(+id);
  }

  @ApiCreatedResponse({
    type: AddressType, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaAddressTypeDto: ListCriteriaAddressTypeDto) {
    return this.addressType.list(listCriteriaAddressTypeDto);
  }

}
