import { CustomScalar, Scalar } from '@nestjs/graphql'
import { ASTNode, Kind } from 'graphql'

@Scalar('DateTime', type => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'Date & time scalar type'

  parseValue(value: string): Date {
    return new Date(value) // value from the client
  }

  serialize(value: Date): string {
    return new Date(value).toISOString() // value sent to the client
  }

  parseLiteral(ast: ASTNode): Date | undefined {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }

    return undefined
  }
}
