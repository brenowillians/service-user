import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class ListCriteriaStaffDto {
    

    @IsOptional()
    name: string;

    @IsOptional()
    login: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;

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