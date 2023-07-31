import { IUserRequiredLounge } from '../interfaces/loungeInterface/loungueRequired.interface'
import { IUserOptional } from '../interfaces/userOptional.interface'

export type UserPropertiesloungeType = Required<IUserRequiredLounge> & Partial<IUserOptional>
