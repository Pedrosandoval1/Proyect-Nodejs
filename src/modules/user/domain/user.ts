import { IEntity } from '../../shared/entity.interface'
import { IUserUpdate } from './interfaces/userUpdate.interface'
import { UserPropertiesType } from './types/properties.type'

export default class User implements IEntity<UserPropertiesType, IUserUpdate> {
	private name: string
	private lastname: string
	private code: string
	private lounge: string
	private refreshToken: string
	private active: boolean
	private readonly guid: string

	constructor(userPropertiesType: UserPropertiesType) {
		this.active = true
		Object.assign(this, userPropertiesType)
	}

	properties(): UserPropertiesType {
		return {
			name: this.name,
			lastname: this.lastname,
			code: this.code,
			lounge: this.lounge,
			refreshToken: this.refreshToken,
			active: this.active,
			guid: this.guid,
		}
	}

	update(fields: IUserUpdate): void {
		Object.assign(this, fields)
	}

	delete() {
		this.active = false
	}
}
