import App from './app'
import DataBaseB from './bootstrap/database.bootstrap'
import ServerBootstrap from './bootstrap/server.boostrap'
import { BaseBootstrap } from './bootstrap/base.bootstrap'

const serverBootstrap: BaseBootstrap = new ServerBootstrap(App)
const databaseBootstrap: BaseBootstrap = new DataBaseB()

;(async () => {
	try {
		await databaseBootstrap.initialize()
		console.log('Database started successfully in index.ts')
		await serverBootstrap.initialize()
	} catch (err) {
		console.error('Error during initialization:', err)
	}
})()
