import { AppService } from './services/app.service'
import { BaseBootstrap } from './base.bootstrap'
import { DB_CONFIG } from './interfaces/dbConfig.interface'
import { UserEntity } from '../modules/user/infraestructura/user.entity'
import { DataSource } from 'typeorm'

let appDataSource: DataSource

export default class DataBaseB extends BaseBootstrap {
	async initialize(): Promise<DataSource> {
		const dbConfig: DB_CONFIG = AppService.DBConfig
		const connectionOptions = new DataSource({
			type: 'mysql',
			...dbConfig,
			entities: [UserEntity],
			synchronize: true,
		})
		const connection = await connectionOptions.initialize()
		appDataSource = connection
		return appDataSource
	}

	static get dataSource(): DataSource {
		return appDataSource
	}
}
