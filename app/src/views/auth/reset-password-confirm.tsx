import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { Send } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { ResetPasswordConfirmInput, useResetPasswordConfirmMutation } from '../../graphql/generated'
import { handleNavigateTo, navigateTo } from '../../routes'

import { FormActions, FormBox, FormCallout } from './components/form'
import {
  CodeFormField,
  ConfirmPasswordFormField,
  EmailFormField,
  PasswordFormField,
} from './components/inputs'

export const RESET_PASSWORD_CONFIRM_MUTATION = gql`
  mutation ResetPasswordConfirm($data: ResetPasswordConfirmInput!) {
    resetPasswordConfirm(data: $data) {
      ...AuthFragment
      user {
        ...UserFragment
      }
    }
  }
`

export interface ResetPasswordConfirmFormData extends ResetPasswordConfirmInput {
  confirmPassword: string
}

export const ResetPasswordConfirmView: React.FC = () => {
  const form = useForm<ResetPasswordConfirmFormData>({ mode: 'onBlur' })

  const [resetPasswordConfirm, mutation] = useResetPasswordConfirmMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: () => {
      // FIXME: login and go home
      navigateTo('/login')
    },
  })

  const handleSubmit = form.handleSubmit(async ({ confirmPassword, ...rest }) => {
    await resetPasswordConfirm({ variables: { data: rest } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Set new password</Heading>

        <Paragraph>Enter code from email and set new password.</Paragraph>

        <FormCallout type="error">{mutation.error?.message}</FormCallout>

        <EmailFormField form={form} name="email" />

        <CodeFormField form={form} name="code" />

        <PasswordFormField form={form} name="newPassword" />

        <ConfirmPasswordFormField form={form} name="confirmPassword" compareName="newPassword" />

        <FormActions>
          <Button
            primary
            size="large"
            label="Reset password"
            type="submit"
            disabled={mutation.called && !mutation.error}
            icon={<Send />}
          />

          <Anchor onClick={handleNavigateTo('/login')}>Go to login</Anchor>
          <Anchor onClick={handleNavigateTo('/recover')}>Reset password again</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
