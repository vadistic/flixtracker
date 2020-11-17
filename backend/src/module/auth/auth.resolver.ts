import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'

import { UserModel } from '../../feature/user/dto/user.model'

import { AuthService } from './auth.service'
import { AuthModel } from './dto/auth.model'
import { LoginInput } from './dto/login.input'
import { RefreshInput } from './dto/refresh.input'
import { ResetPasswordConfirmInput, ResetPasswordRequestInput } from './dto/reset-password.input'
import { SignupInput } from './dto/signup.input'
import { VerifyEmailConfirmInput, VerifyEmailRequestInput } from './dto/verify-email.input'

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
  async verifyEmailRequest(@Args('data') data: VerifyEmailRequestInput): Promise<string> {
    await this.authService.verifyEmailRequest(data)

    return data.email
  }

  @Mutation(returns => AuthModel)
  async verifyEmailConfirm(@Args('data') data: VerifyEmailConfirmInput): Promise<AuthModel> {
    const user = await this.authService.verifyEmailConfirm(data)

    return this.authService.generateTokens({ userId: user.id })
  }

  @Mutation(returns => String)
  async resetPasswordRequest(@Args('data') data: ResetPasswordRequestInput): Promise<string> {
    await this.authService.resetPaswordRequest(data)

    return data.email
  }

  @Mutation(returns => AuthModel)
  async resetPasswordConfirm(@Args('data') data: ResetPasswordConfirmInput): Promise<AuthModel> {
    const user = await this.authService.resetPaswordConfirm(data)

    return this.authService.generateTokens({ userId: user.id })
  }

  @Mutation(returns => String)
  refreshToken(@Args('data') { token: refreshToken }: RefreshInput): string {
    return this.authService.refreshToken(refreshToken)
  }

  @ResolveField(type => UserModel)
  async user(@Parent() auth: AuthModel) {
    return this.authService.getUserByToken(auth.accessToken)
  }
}
