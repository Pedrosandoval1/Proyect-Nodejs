import { IUserRequired } from '../interfaces/userRequired.interface'
import { IUserOptional } from '../interfaces/userOptional.interface'

export type UserPropertiesType = Required<IUserRequired> & Partial<IUserOptional>
