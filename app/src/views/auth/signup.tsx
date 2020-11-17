import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading } from 'grommet'
import { Google, UserNew } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AUTH_ENPOINT } from '../../config'
import { SignupInput, useSignupMutation } from '../../graphql/generated'
import { mutations } from '../../graphql/mutations'
import { handleNavigateTo, navigateTo } from '../../routes'

import { FormActions, FormBox, FormCallout } from './components/form'
import { ConfirmPasswordFormField, EmailFormField, PasswordFormField } from './components/inputs'

export const SIGNUP_MUTATION = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
`

export interface SignupFormData extends SignupInput {
  confirmPassword: string
}

export const SignupView: React.FC = () => {
  const form = useForm<SignupFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [loginMutation, mutation] = useSignupMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: data => {
      mutations.login(data.signup, data.signup.user)

      navigateTo('/')
    },
  })

  const handleSubmit = form.handleSubmit(async ({ confirmPassword, ...rest }) => {
    await loginMutation({ variables: { data: rest } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Signup</Heading>

        <FormCallout type="error">{mutation.error?.message}</FormCallout>

        <EmailFormField form={form} name="email" />

        <PasswordFormField form={form} name="password" />

        <ConfirmPasswordFormField form={form} name="confirmPassword" compareName="password" />

        <FormActions>
          <Button
            primary
            size="large"
            label="Login"
            type="submit"
            disabled={mutation.loading}
            icon={<UserNew />}
          />
          <Button
            secondary
            size="large"
            label="Google authentication"
            disabled={mutation.loading}
            icon={<Google />}
            href={AUTH_ENPOINT + '/google'}
          />
          <Anchor onClick={handleNavigateTo('/login')}>Login instead</Anchor>
          <Anchor onClick={handleNavigateTo('/recover')}>Forgotten password</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
