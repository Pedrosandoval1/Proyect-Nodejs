import User from './user'
import { UserPropertiesType } from './types/properties.type'
import {
	UserNameRequiredException,
	UserLastnameRequiredException,
	UserCodeRequiredException,
	UserCodeLengthInvalidException,
} from './exceptions/user.exception'
import { UserCodeService } from './services/userCode.service'
import { v4 as uuidv4 } from 'uuid'
import { Result, err, ok } from 'neverthrow'

export type UserResult = Result<
User,
| UserNameRequiredException
| UserLastnameRequiredException
| UserCodeLengthInvalidException
| UserCodeRequiredException
>

export default class UserFactory {
	async create(name: string, lastname: string, code: string, lounge: string): Promise<UserResult> {
		if (!name || name.trim() === '') {
			return err(new UserNameRequiredException())
		}

		if (!lastname || lastname.trim() === '') {
			return err(new UserLastnameRequiredException())
		}

		if (!code || code.trim() === '') {
			return err(new UserCodeRequiredException())
		}

		if (code.length < 5) {
			return err(new UserCodeLengthInvalidException(code))
		}

		const codeHash = await UserCodeService.hash(code)
		const userPropertiesType: UserPropertiesType = {
			name,
			lastname,
			code: codeHash,
			lounge,
			guid: uuidv4(),
			refreshToken: uuidv4(),
		}
		const user = new User(userPropertiesType)
		return ok(user)
	}
}
