export const AUTH_ERROR = {
  // 403 - forbidden
  NOT_REGISTERED: `Cannot login because user is not registered`,
  BANNED: `User is banned`,
  EMAIL_UNCONFIRMED: `User's email is not confirmed`,
  INVALID_PASSWORD: `Invalid password`,

  USE_GOOGLE: `User should use google authentication`,
  USE_LOCAL: `User should use email/password authentication`,

  UNVERIFIED_OAUTH: `Social login email is not verified`,

  // 401 - unauthorized
  UNAUTHORIZED: `Unauthorized`,
  INVALID_REFRESH_TOKEN: `Invalid refresh token`,
  MISSING_REFRESH_TOKEN: `Missing refresh token`,

  // 500
  LOGIN_FAILED: `Server failed to login user`,
  OAUTH_FAILED: `Server failed to socially authenticate user`,
  SIGNUP_FAILED: `Server failed to signup user`,
} as const