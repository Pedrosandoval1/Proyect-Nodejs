import User from './user'
import { IUserUpdate } from './interfaces/userUpdate.interface'
import { UserNotFoundException } from './exceptions/user.exception'
import { Result } from 'neverthrow'

export interface UserRepository {
	insert(user: User): Promise<User>
	list(): Promise<User[]>
	listOne(guid: string): Promise<Result<User, UserNotFoundException>>
	update(guid: string, user: Partial<IUserUpdate>): Promise<Result<User, UserNotFoundException>>
	delete(guid: string): Promise<Result<User, UserNotFoundException>>
	lounges(guid: string): Promise<Result<User, UserNotFoundException>>
	insertLounges(user: User): Promise<User>
}
