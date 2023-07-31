import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserInsertOneDtoType } from './types/userInsert.types'

export class UserInsertMapping extends DTO<UserPropertiesType, UserInsertOneDtoType> {
	execute(data: UserPropertiesType): UserInsertOneDtoType {
		if (data.name && data.lastname && data.code) {
			return {
				name: data.name,
				lastname: data.lastname,
				lounge: data.lounge,
				guid: data.guid,
			}
		}
	}
}
