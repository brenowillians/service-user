import {IsNotEmpty} from 'class-validator';


export class GetCodeUserDto {

  @IsNotEmpty({message:"CAMPO LOGIN OBRIGATÓRIO"})
  login: string;
}