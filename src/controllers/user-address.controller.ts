import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserAddressService } from 'src/services/user-address.service';
import { CreateUserAddressDto } from 'src/dto/create-user-address.dto';
import { UpdateUserAddressDto } from 'src/dto/update-user-address.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserAddress } from 'src/entities/user-address.entity';
import { ListCriteriaUserAddressDto } from 'src/dto/list-criteria-user-address.dto';


@ApiTags('UserAddress') // Titulo Da Cadeia de Metodos
@Controller('user-address')
export class UserAddressController {
    
        
        
    
    constructor(private readonly userAddress: UserAddressService) {}

  @Get('alteracao')
  alteracao() {
    return "ESSA PORRA TÁ ALTERADA"
  }
  
  @ApiCreatedResponse({
    type: UserAddress, // aqui definimos o tipo de resposta
  }) 
  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddress.create(createUserAddressDto);
  }

  @ApiCreatedResponse({
    type: UserAddress, // aqui definimos o tipo de resposta
  }) 
  @Get()
  findAll() {
    return this.userAddress.findAll();
  }

  @ApiCreatedResponse({
    type: UserAddress, // aqui definimos o tipo de resposta
  }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddress.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Registro atulizado", // aqui definimos o tipo de resposta
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.userAddress.update(+id, updateUserAddressDto);
  }

  @ApiCreatedResponse({
    description: "Registro excluido", // aqui definimos o tipo de resposta
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddress.remove(+id);
  }

  @ApiCreatedResponse({
    type: UserAddress, // aqui definimos o tipo de resposta
  }) 
  @Post('list')
  list(@Body() listCriteriaUserAddressDto: ListCriteriaUserAddressDto) {
    return this.userAddress.list(listCriteriaUserAddressDto);
  }

}
