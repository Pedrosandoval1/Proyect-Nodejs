import bcrypt from 'bcryptjs'

export class UserCodeService {
	static hash(code: string): Promise<string> {
		return bcrypt.hash(code, 10)
	}
}
