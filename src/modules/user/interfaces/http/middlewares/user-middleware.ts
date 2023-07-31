import { validate } from 'class-validator'
import { UserlistOneValidator } from '../validators/userListOne.validator'
import { NextFunction, Request, Response } from 'express'

class UserMiddleware {
	static async ValidateListOne(req: Request, _res: Response, next: NextFunction) {
		const { guid } = req.params
		const userListOneValidator = new UserlistOneValidator()
		userListOneValidator.guid = guid
		const errors = await validate(userListOneValidator)
		if (errors.length > 0) {
			return next(new Error('Invalid request'))
		}
		next()
	}
}

export const MiddlewareListOne: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
	UserMiddleware.ValidateListOne,
]
