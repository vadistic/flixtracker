import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { Auth } from './dto/auth.model'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
import { Token } from './dto/token.model'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Auth)
  async signup(@Args('data') data: SignupInput): Promise<Token> {
    return this.authService.signup(data)
  }

  @Mutation(returns => Auth)
  async login(@Args('data') { email, password }: LoginInput): Promise<Token> {
    return this.authService.login(email, password)
  }

  @Mutation(returns => Token)
  refreshToken(@Args('token') token: string) {
    return this.authService.refreshToken(token)
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromToken(auth.accessToken)
  }
}
