import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading } from 'grommet'
import { Google, Login } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AUTH_ENPOINT } from '../../config'
import { LoginInput, useLoginMutation } from '../../graphql/generated'
import { mutations } from '../../graphql/mutations'
import { handleNavigateTo, navigateTo } from '../../routes'

import { FormActions, FormBox, FormCallout } from './components/form'
import { EmailFormField, PasswordFormField } from './components/inputs'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
`

export const LoginView: React.FC = () => {
  const form = useForm<LoginInput>({ mode: 'onSubmit', reValidateMode: 'onChange' })

  const [loginMutation, { error, loading }] = useLoginMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: data => {
      mutations.login(data.login, data.login.user)

      navigateTo('/')
    },
  })

  const handleSubmit = form.handleSubmit(async data => {
    await loginMutation({ variables: { data } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Login</Heading>
        <FormCallout type="error">{error?.message}</FormCallout>

        <EmailFormField form={form} name="email" />

        <PasswordFormField form={form} name="password" />

        <FormActions>
          <Button
            primary
            size="large"
            label="Login"
            type="submit"
            disabled={loading}
            icon={<Login />}
          />
          <Button
            secondary
            size="large"
            label="Google authentication"
            disabled={loading}
            icon={<Google />}
            href={AUTH_ENPOINT + '/google'}
          />
          <Anchor onClick={handleNavigateTo('/signup')}>Create account</Anchor>
          <Anchor onClick={handleNavigateTo('/recover')}>Forgotten password</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
