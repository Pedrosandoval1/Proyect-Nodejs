import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserListDtoType } from './types/userList.type'

export class UserListMapping extends DTO<UserPropertiesType[], UserListDtoType> {
	execute(data: UserPropertiesType[]): UserListDtoType {
		return data.map((user: UserPropertiesType) => {
			return {
				name: user.name,
				lastname: user.lastname,
				code: user.code,
				guid: user.guid,
			}
		})
	}
}
