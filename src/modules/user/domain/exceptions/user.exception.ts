import { DomainExectionCode } from '../enum/domainException.enum'
import { DomainException } from './domain.exception'

export class UserNameRequiredException extends DomainException {
	constructor() {
		super(UserNameRequiredException.getMessage())
		this.name = DomainExectionCode.USER_NAME_REQUIRED
	}

	static getMessage() {
		return 'Name is required'
	}
}

export class UserLastnameRequiredException extends DomainException {
	constructor() {
		super(UserLastnameRequiredException.getMessage())
		this.name = DomainExectionCode.USER_LASTNAME_REQUIRED
	}

	static getMessage() {
		return 'Lastname is required'
	}
}

export class UserLoungeRequiredException extends DomainException {
	constructor() {
		super(UserLoungeRequiredException.getMessage())
		this.name = DomainExectionCode.USER_LOUNGE_REQUIRED
	}

	static getMessage() {
		return 'lounge is required'
	}
}

export class UserLoungeInvalidException extends DomainException {
	constructor() {
		super(UserLoungeInvalidException.getMessage())
		this.name = DomainExectionCode.USER_LOUNGE_INVALID
	}

	static getMessage() {
		return 'lounge is invalid'
	}
}

export class UserCodeRequiredException extends DomainException {
	constructor() {
		super(UserCodeRequiredException.getMessage())
		this.name = DomainExectionCode.USER_CODE_REQUIRED
	}

	static getMessage() {
		return 'code is required'
	}
}

export class UserCodeLengthInvalidException extends DomainException {
	constructor(code: string) {
		super(UserCodeLengthInvalidException.getMessage(code))
		this.name = DomainExectionCode.USER_CODE_LENGTH_INVALID
	}

	static getMessage(code: string) {
		return `code must be more than 4 characters, but '${code}' has only ${code.length}`
	}
}

export class UserGuidInvalidException extends DomainException {
	constructor() {
		super(UserGuidInvalidException.getMessage())
		this.name = DomainExectionCode.USER_GUID_INVALID
	}

	static getMessage() {
		return 'Guid is invalid'
	}
}

export class UserNotFoundException extends DomainException {
	constructor() {
		super(UserNotFoundException.getMessage())
		this.name = DomainExectionCode.USER_NOT_FOUND
	}

	static getMessage() {
		return 'User not found'
	}
}
export class LoungeNotFoundException extends DomainException {
	constructor() {
		super(UserNotFoundException.getMessage())
		this.name = DomainExectionCode.LOUNGE_NOT_FOUND
	}
}
