import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserUpdateDtoType } from './types/userUpdate.type'

export class UserUpdateMapping extends DTO<UserPropertiesType, UserUpdateDtoType> {
	execute(data: UserPropertiesType): UserUpdateDtoType {
		if (!data.code) {
			return {
				name: data.name,
				lastname: data.lastname,
				lounge: data.lounge,
				guid: data.guid,
			}
		}
	}
}
