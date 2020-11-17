import { gql } from '@apollo/client'
import { Anchor, Box, Button, FormField, Heading, TextInput } from 'grommet'
import { Google, Login } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { FormBox, FormActions, FormCallout } from '../../components/form'
import { AUTH_ENPOINT } from '../../config'
import { LoginInput, useLoginMutation } from '../../graphql/generated'
import { mutations } from '../../graphql/mutations'
import { handleNavigateTo, navigateTo } from '../../routes'
import { isEmail } from '../../utils/validation'

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

        <FormField label="Email" error={form.errors.email?.message}>
          <TextInput
            name="email"
            type="email"
            ref={form.register({
              required: 'Field required',
              validate: {
                isEmail: value => isEmail(value) || 'Not a valid email',
              },
            })}
            required></TextInput>
        </FormField>

        <FormField label="Password" error={form.errors.password?.message}>
          <TextInput
            name="password"
            type="password"
            ref={form.register({
              required: 'Field required',
              minLength: { value: 8, message: 'Password too short' },
            })}
            required></TextInput>
        </FormField>

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
          <Anchor onClick={handleNavigateTo('/signup')}>Create account!</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
