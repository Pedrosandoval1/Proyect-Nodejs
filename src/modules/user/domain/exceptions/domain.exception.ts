import { DomainExectionCode } from '../enum/domainException.enum'

export abstract class DomainException extends Error {
	constructor(message?: string) {
		super(message)
		this.name = DomainExectionCode.DEFAULT_DOMAIN_EXCEPTION
	}
}
