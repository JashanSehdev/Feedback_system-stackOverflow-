import { IsOptional, IsString, Matches } from "class-validator"

export class RegisterUserDto {


    @IsString()
    @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, { message : 'Username must start with a letter and contain only letters, numbers, and underscores'})
    username: string


    @IsString()
    email : string


    @IsString()
    password : string

    
}
