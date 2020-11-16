import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'

import { UserModel } from '../../feature/user/dto/user.model'

import { AuthService } from './auth.service'
import { AuthModel } from './dto/auth.model'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
import { VerifyEmailInput } from './dto/verify-email.input'

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AuthModel)
  async signup(@Args('data') data: SignupInput): Promise<AuthModel> {
    return this.authService.signup(data)
  }

  @Mutation(returns => AuthModel)
  async login(@Args('data') { email, password }: LoginInput): Promise<AuthModel> {
    return this.authService.login(email, password)
  }

  @Mutation(returns => String)
  async confirmEmail(@Args('data') data: VerifyEmailInput) {
    return this.authService.verifyEmailConfirm(data)
  }

  @Mutation(returns => String)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken)
  }

  @ResolveField(type => UserModel)
  async user(@Parent() auth: AuthModel) {
    return this.authService.getUserByToken(auth.accessToken)
  }
}
