import { DTO } from './dto.generic'
import { UserPropertiesType } from '../../../domain/types/properties.type'
import { UserLoungeDtoType } from './types/userLounge.type'

export class UserLongeOnetMapping extends DTO<UserPropertiesType, UserLoungeDtoType> {
	execute(data: UserPropertiesType): UserLoungeDtoType {
		if (data.active === true) {
			return {
				lounge: data.lounge,
				name: data.name,
				code: data.code,
			}
		}
	}
}
