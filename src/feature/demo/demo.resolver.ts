import { Resolver, Query, Args } from '@nestjs/graphql'

@Resolver()
export class DemoResolver {
  @Query(returns => String)
  helloWorld(): string {
    return 'Hello World!'
  }

  @Query(returns => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`
  }
}
