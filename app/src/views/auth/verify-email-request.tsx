import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { Send } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useResetPasswordRequestMutation, VerifyEmailRequestInput } from '../../graphql/generated'
import { handleNavigateTo, navigateTo } from '../../routes'

import { FormActions, FormBox, FormCallout } from './components/form'
import { EmailFormField } from './components/inputs'

export const VERIFY_EMAIL_REQUEST_MUTATION = gql`
  mutation VerifyEmailRequest($data: VerifyEmailRequestInput!) {
    verifyEmailRequest(data: $data)
  }
`

export const VerifyEmailRequestView: React.FC = () => {
  const form = useForm<VerifyEmailRequestInput>({ mode: 'onBlur' })

  const [resetPasswordConfirm, mutation] = useResetPasswordRequestMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: () => {
      // TODO: pass data
      navigateTo('/reset')
    },
  })

  const handleSubmit = form.handleSubmit(async data => {
    console.log('resetPasswordConfirm')
    await resetPasswordConfirm({ variables: { data } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Resend email confirmation</Heading>

        <Paragraph>
          If you did not receive confiormation email you can request another one here. Try checking
          spam folder.
        </Paragraph>

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

          <Anchor onClick={handleNavigateTo('/login')}>Go to login</Anchor>
          <Anchor onClick={handleNavigateTo('/recover')}>Reset password again</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
