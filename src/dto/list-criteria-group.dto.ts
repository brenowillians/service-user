import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class ListCriteriaGroupDto {
    

    @IsOptional()
    name: string ;
      

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean | null;


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