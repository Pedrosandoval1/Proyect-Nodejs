import UserApllication from '../../application/user.application'
import UserInfraestructure from '../../infraestructura/user.infraestructure'
import userController from './user.controller'
import { UserRepository } from '../../domain/user.repository'
import { MiddlewareListOne } from './middlewares/user-middleware'
import { Router } from 'express'

const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApllication(infraestructure)
const controller = new userController(application)

class UserRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
		this.mountRoutes()
		this.mountLounges()
	}

	mountRoutes() {
		this.expressRouter.post('/insert', controller.insert)
		this.expressRouter.get('/list', controller.list)
		this.expressRouter.get('/listOne/:guid', ...MiddlewareListOne, controller.listOne)
		this.expressRouter.put('/update/:guid', controller.update)
		this.expressRouter.delete('/delete/:guid', controller.delete)
	}

	mountLounges() {
		this.expressRouter.post('/addListLounges', controller.insertLounges)
		this.expressRouter.get('/listlounges/:guid', controller.lounge)
	}
}

export default new UserRouter().expressRouter
