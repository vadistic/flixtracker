import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { Send } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { ResetPasswordRequestInput, useResetPasswordRequestMutation } from '../../graphql/generated'
import { handleNavigateTo, navigateTo } from '../../routes'

import { FormActions, FormBox, FormCallout } from './components/form'
import { EmailFormField } from './components/inputs'

export const RESET_PASSWORD_REQUEST_MUTATION = gql`
  mutation ResetPasswordRequest($data: ResetPasswordRequestInput!) {
    resetPasswordRequest(data: $data)
  }
`

export const ResetPasswordRequestView: React.FC = () => {
  const form = useForm<ResetPasswordRequestInput>({
    mode: 'onBlur',
  })

  const [resetPasswordRequest, mutation] = useResetPasswordRequestMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: () => {
      navigateTo('/reset')
    },
  })

  const handleSubmit = form.handleSubmit(async (data: ResetPasswordRequestInput) => {
    await resetPasswordRequest({ variables: { data } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Recover account / password reset</Heading>

        <Paragraph>Provide account email and password reset code will be sent to you.</Paragraph>

        <FormCallout type="error">{mutation.error?.message}</FormCallout>

        <EmailFormField form={form} name="email" />

        <FormActions>
          <Button
            primary
            size="large"
            label="Reset password"
            type="submit"
            disabled={mutation.called && !mutation.error}
            icon={<Send />}
          />

          <Anchor onClick={handleNavigateTo('/reset')}>Enter password reset code</Anchor>

          <Anchor onClick={handleNavigateTo('/login')}>Go to login</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
