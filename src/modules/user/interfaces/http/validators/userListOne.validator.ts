import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserlistOneValidator {
	// desing patters decorador
	@IsString({ message: 'guid must be a string' })
	@IsNotEmpty({ message: 'guid must not be empty' })
	@MinLength(10, { message: 'guid must be at least 10 characters' })
	guid: string
}
