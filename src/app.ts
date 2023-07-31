import mainpathHelpers from './helpers/mainpath-helpers'
import routerUser from './modules/user/interfaces/http/user.routes'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import error from './helpers/error'
import compression from 'compression'
import express, { Application } from 'express'

class App {
	readonly expressApp: Application

	constructor() {
		this.expressApp = express()
		this.owaspSegurityMiddlewares()
		this.mountMainRoute()
		this.mountMiddlewares()
		this.mountRoutes()
		this.mountError()
	}

	owaspSegurityMiddlewares() {
		this.expressApp.use(hpp())
		this.expressApp.use(helmet())
		this.expressApp.use(
			cors({
				origin: '*',
				optionsSuccessStatus: 200,
				methods: ['GET', 'POST', 'PUT', 'DELETE'],
			}),
		)
	}

	mountMainRoute() {
		this.expressApp.get('/', mainpathHelpers)
	}

	mountMiddlewares() {
		this.expressApp.use(compression())
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded({ extended: true }))
	}

	mountRoutes(): void {
		this.expressApp.use('/user', routerUser)
	}

	mountError(): void {
		this.expressApp.use(error.notFound)
		this.expressApp.use(error.genericError)
	}
}

export default new App().expressApp
