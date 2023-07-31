import { UserGuidInvalidException } from '../exceptions/user.exception'
import { ValueObject } from './vo.class'
import { validate as uuidValidate } from 'uuid'
import { Result, err, ok } from 'neverthrow'

interface IGuidProps {
	value: string
}

type GuidResultType = Result<GuiVO, UserGuidInvalidException>

export class GuiVO extends ValueObject<IGuidProps> {
	private constructor(props: IGuidProps) {
		super(props)
	}

	static create(guid: string): GuidResultType {
		if (!uuidValidate(guid)) {
			return err(new UserGuidInvalidException())
		}
		return ok(new GuiVO({ value: guid }))
	}
	get value(): string {
		return this.props.value
	}
}
