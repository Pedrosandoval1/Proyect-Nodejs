import { Router, Request, Response } from 'express'

class mainPath {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
		this.mountRouter()
	}

	mountRouter() {
		this.expressRouter.get('/', (req: Request, res: Response) => res.send('All is ok'))
	}
}

export default new mainPath().expressRouter
