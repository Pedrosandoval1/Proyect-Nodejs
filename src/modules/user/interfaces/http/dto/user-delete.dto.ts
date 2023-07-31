import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserDeleteDtoType } from './types/userDelete.type'

export class UserDeleteMapping extends DTO<UserPropertiesType, UserDeleteDtoType> {
	execute(data: UserPropertiesType): UserDeleteDtoType {
		return {
			name: data.name,
			lastname: data.lastname,
			lounge: data.lounge,
			guid: data.guid,
		}
	}
}
