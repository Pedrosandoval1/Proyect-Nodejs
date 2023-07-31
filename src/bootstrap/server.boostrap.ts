import { BaseBootstrap } from './base.bootstrap'
import { AppService } from './services/app.service'
import { Application } from 'express'
import http from 'http'

export default class ServerBootstrap extends BaseBootstrap {
	constructor(private readonly app: Application) {
		super()
	}
	initialize() {
		return new Promise<string | Error>((_resolve, reject) => {
			const server = http.createServer(this.app)

			server
				.listen(`${AppService.PORT}`)
				.on('listening', () => {
					console.log(`Server is running on port ${AppService.PORT}`)
				})
				.on('error', err => {
					reject(err)
					console.log(`server error in ${AppService.PORT}`)
				})
		})
	}
}
