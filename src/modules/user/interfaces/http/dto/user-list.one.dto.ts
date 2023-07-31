import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserListOneDtoType } from './types/userListOne.type'

export class UserListOnetMapping extends DTO<UserPropertiesType, UserListOneDtoType> {
	execute(data: UserPropertiesType): UserListOneDtoType {
		if (data.active === true) {
			return {
				name: data.name,
				lastname: data.lastname,
				lounge: data.lounge,
				guid: data.guid,
			}
		}
	}
}
