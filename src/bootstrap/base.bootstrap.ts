import { DataSource } from 'typeorm'

export abstract class BaseBootstrap {
	abstract initialize(): Promise<string | Error | DataSource>
}
