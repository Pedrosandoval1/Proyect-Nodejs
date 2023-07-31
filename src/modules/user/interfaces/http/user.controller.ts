import UserApllication from '../../application/user.application'
import UserFactory from '../../domain/user.factory'
import { IError } from '../helpers/ierror'
import { UserInsertMapping } from './dto/user-insert.dto'
import { UserListMapping } from './dto/user-list.dto'
import { GuiVO } from '../../domain/value-objects/guid.vo'
import { UserListOnetMapping } from './dto/user-list.one.dto'
import { UserUpdateMapping } from './dto/user-update.dto'
import { UserDeleteMapping } from './dto/user-delete.dto'
import { UserLongeOnetMapping } from './dto/user-lounge.dto'
import { LoungeInsertMapping } from './dto/lounge.insert.dto'
import { NextFunction, Request, Response } from 'express'

export default class UserController {
	constructor(private application: UserApllication) {
		this.insert = this.insert.bind(this)
		this.list = this.list.bind(this)
		this.listOne = this.listOne.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.lounge = this.lounge.bind(this)
		this.insertLounges = this.insertLounges.bind(this)
	}

	async insert(req: Request, res: Response, next: NextFunction) {
		const { name, lastname, code, lounge } = req.body
		if (!code) {
			const response = res.status(404).json({
				msg: 'El servidor rechaza, comunicarse con el area administratica.',
			})
			return next(response)
		}
		const userResult = await new UserFactory().create(name, lastname, code, lounge)
		if (userResult.isErr()) {
			const err: IError = new Error(userResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const data = await this.application.insert(userResult.value)
			if (data) {
				const result = new UserInsertMapping().execute(data.properties())
				res.status(201).json(result)
			} else {
				return res
					.status(404)
					.json({ msg: 'el usuario está inactivo o no está creado, comunicarse con el area administratica' })
			}
		}
	}

	async list(req: Request, res: Response) {
		const list = await this.application.list()
		const result = new UserListMapping().execute(list.map(user => user.properties()))
		res.json(result)
	}

	async listOne(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const guidResult = GuiVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const userResult = await this.application.listOne(guid)
		if (userResult.isErr()) {
			return res.status(404).send(userResult.error.message)
		} else if (userResult.isOk()) {
			const result = new UserListOnetMapping().execute(userResult.value.properties())
			if (result) {
				return res.json(result)
			} else {
				return res.json({
					msg: 'el usuario está inactivo o no está creado, comunicarse con el area administratica',
				})
			}
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const fieldsToUpdate = req.body

		const guidResult = GuiVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.update(guid, fieldsToUpdate)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		} else {
			const result = new UserUpdateMapping().execute(dataResult.value.properties())
			if (result) {
				return res.json(result)
			} else {
				return res.json({ msg: 'code no se puede actualizar, comunicarse con el area administratica' })
			}
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const guidResult = GuiVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.delete(guid)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		} else {
			const result = new UserDeleteMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}

	async lounge(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const guidResult = GuiVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const userResult = await this.application.lounges(guid)
		if (userResult.isErr()) {
			return res.status(404).send(userResult.error.message)
		} else if (userResult.isOk()) {
			const result = new UserLongeOnetMapping().execute(userResult.value.properties())
			if (result) {
				return res.json(result)
			} else {
				return res.json({
					msg: 'el usuario está inactivo o no está creado, comunicarse con el area administratica',
				})
			}
		}
	}

	async insertLounges(req: Request, res: Response, next: NextFunction) {
		const { name, lastname, code, lounge } = req.body
		if (!code) {
			const response = res.status(404).json({
				msg: 'Necesitas un lounge para poder agregar a una clase',
			})
			return next(response)
		}
		const userResult = await new UserFactory().create(name, lastname, code, lounge)
		if (userResult.isErr()) {
			const err: IError = new Error(userResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const data = await this.application.insertLounges(userResult.value)
			const result = new LoungeInsertMapping().execute(data.properties())
			if (result) {
				res.status(201).json(result)
			} else {
				return res.json({ msg: 'el usuario ya está en este saló' })
			}
		}
	}
}
