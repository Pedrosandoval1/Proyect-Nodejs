import User from '../domain/user';
import DataBaseB from '../../../bootstrap/database.bootstrap';
import { IUserUpdate } from '../domain/interfaces/userUpdate.interface';
import { UserRepository } from '../domain/user.repository';
import { UserNotFoundException } from '../domain/exceptions/user.exception';
import { UserEntity } from './user.entity';
import { err, ok, Result } from 'neverthrow';

export default class UserInfraestructure implements UserRepository {
	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()
		Object.assign(userInsert, user.properties())
		await DataBaseB.dataSource.getRepository(UserEntity).save(userInsert)
		return user
	}

	async list(): Promise<User[]> {
		const repo = DataBaseB.dataSource.getRepository(UserEntity)
		const res = await repo.find({ where: { active: true } })
		return res.map((el: UserEntity) => {
			return new User({
				name: el.name,
				lastname: el.lastname,
				lounge: el.lounge,
				code: el.code,
			})
		})
	}

	async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DataBaseB.dataSource.getRepository(UserEntity)
		const result = await repo.findOne({ where: { guid } })
		if (!result) {
			return err(new UserNotFoundException())
		} else {
			return ok(
				new User({
					guid: result.guid,
					name: result.name,
					lastname: result.lastname,
					lounge: result.lounge,
					code: result.code,
					refreshToken: result.refreshToken,
					active: result.active,
				}),
			)
		}
	}

	async update(guid: string, user: Partial<IUserUpdate>): Promise<Result<User, UserNotFoundException>> {
		const repo = DataBaseB.dataSource.getRepository(UserEntity)
		const userFound = await repo.findOne({ where: { guid } })
		if (userFound) {
			Object.assign(userFound, user)
			const userEntity = await repo.save(userFound)
			return ok(
				new User({
					guid: userEntity.guid,
					name: userEntity.name,
					lastname: userEntity.lastname,
					lounge: userEntity.lounge,
					code: userEntity.code,
					refreshToken: userEntity.refreshToken,
					active: userEntity.active,
				}),
			)
		} else {
			return err(new UserNotFoundException())
		}
	}

	async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DataBaseB.dataSource.getRepository(UserEntity)
		const userFound = await repo.findOne({ where: { guid } })

		if (userFound) {
			userFound.active = false
			const userEntity = await repo.save(userFound)
			return ok(
				new User({
					guid: userEntity.guid,
					name: userEntity.name,
					lastname: userEntity.lastname,
					lounge: userEntity.lounge,
					code: userEntity.code,
					refreshToken: userEntity.refreshToken,
					active: userEntity.active,
				}),
			)
		} else {
			return err(new UserNotFoundException())
		}
	}
	async lounges(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DataBaseB.dataSource.getRepository(UserEntity)
		const result = await repo.findOne({ where: { guid } })
		if (!result) {
			return err(new UserNotFoundException())
		} else {
			return ok(
				new User({
					guid: result.guid,
					name: result.name,
					lastname: result.lastname,
					lounge: result.lounge,
					code: result.code,
					refreshToken: result.refreshToken,
					active: result.active,
				}),
			)
		}
	}
	async insertLounges(user: User): Promise<User> {
		const LoungeInsert = new UserEntity()
		Object.assign(LoungeInsert, user.properties())
		await DataBaseB.dataSource.getRepository(UserEntity).save(LoungeInsert)
		return user
	}
}
