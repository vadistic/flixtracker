import { gql } from '@apollo/client'
import { Anchor, Box, Button, FormField, Heading, TextInput } from 'grommet'
import { Google, UserNew } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { FormBox, FormActions, FormCallout } from '../components/form'
import { AUTH_ENPOINT } from '../config'
import { SignupInput, useSignupMutation } from '../graphql/generated'
import { mutations } from '../graphql/mutations'
import { handleNavigateTo, navigateTo } from '../routes'
import { isEmail } from '../utils/validation'

export const SIGNUP_QUERY = gql`
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

export interface SignupData extends SignupInput {
  confirm: string
}

export const SignupView: React.FC = () => {
  const form = useForm<SignupData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [loginMutation, { error, loading }] = useSignupMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: data => {
      mutations.login(data.signup, data.signup.user)

      navigateTo('/')
    },
  })

  const handleSubmit = form.handleSubmit(async ({ confirm, ...rest }) => {
    await loginMutation({ variables: { data: rest } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Signup</Heading>

        <FormCallout type="error">{error?.message}</FormCallout>

        <FormField label="Email" about="A" error={form.errors.email?.message}>
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

        <FormField label="Confirm password" error={form.errors.confirm?.message}>
          <TextInput
            name="confirm"
            type="password"
            ref={form.register({
              required: 'Field required',
              minLength: { value: 8, message: 'Password too short' },
              validate: {
                matchPassword: data => data === form.watch('password') || 'Passwords must match',
              },
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
            icon={<UserNew />}
          />
          <Button
            secondary
            size="large"
            label="Google authentication"
            disabled={loading}
            icon={<Google />}
            href={AUTH_ENPOINT + '/google'}
          />
          <Anchor onClick={handleNavigateTo('/login')}>Login instead ...</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
