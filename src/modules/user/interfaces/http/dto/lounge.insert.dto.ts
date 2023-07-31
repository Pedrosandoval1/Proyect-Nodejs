import { DTO } from './dto.generic'
import { UserInsertOneDtoType } from './types/userInsert.types'
import { UserPropertiesType } from 'src/modules/user/domain/types/properties.type'

export class LoungeInsertMapping extends DTO<UserPropertiesType, UserInsertOneDtoType> {
	execute(data: UserPropertiesType): UserInsertOneDtoType {
		if (data.name === data.name) {
			return {
				name: data.name,
				lastname: data.lastname,
				lounge: data.lounge,
				guid: data.guid,
			}
		} else {
			return {
				name: 'usuario agregado',
				lastname: 'a',
				lounge: 'a',
				guid: 'a',
			}
		}
	}
}
