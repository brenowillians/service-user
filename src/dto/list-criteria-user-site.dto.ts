import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class ListCriteriaUserSiteDto {
    

    @IsOptional()
    login: string ;

    @IsOptional()
    name: string ;

    @IsOptional()
    gender: string | null;

    @IsOptional()
    phone: string | null;

    @IsOptional()
    mobile: string | null;

    @IsOptional()
    cpf: string | null;
   

    @IsNotEmpty()
    @IsInt()
    items: number;


    @IsNotEmpty()
    @IsInt()
    page: number;


    @IsNotEmpty()
    //ordenar por propriedades indiscriminadas da entidade
    order: { [key: string]: string }

}