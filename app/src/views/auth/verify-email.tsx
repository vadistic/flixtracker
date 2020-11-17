import { gql } from '@apollo/client'
import { Anchor, Box, Button, Heading } from 'grommet'
import { Send } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { VerifyEmailInput, useVerifyEmailConfirmMutation } from '../../graphql/generated'
import { handleNavigateTo } from '../../routes'

import { FormActions, FormBox } from './components/form'
import { CodeFormField, EmailFormField } from './components/inputs'

export const VERIFY_EMAIL_CONFIRM_MUTATION = gql`
  mutation VerifyEmailConfirm($data: VerifyEmailInput!) {
    verifyEmailConfirm(data: $data) {
      ...AuthFragment
      user {
        ...UserFragment
      }
    }
  }
`

export const VerifyEmailView: React.FC = () => {
  const [verifyEmail] = useVerifyEmailConfirmMutation({
    onError: () => {
      /* noop */
    },
    onCompleted: () => {
      /* noop */
    },
  })

  const form = useForm<VerifyEmailInput>({
    mode: 'onBlur',
  })

  const handleSubmit = form.handleSubmit(async data => {
    await verifyEmail({ variables: { data } })
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Recover account</Heading>
        {/* <FormCallout type="error">{error?.message}</FormCallout> */}

        <EmailFormField form={form} name="email" />

        <CodeFormField form={form} name="code" />

        <FormActions>
          <Button
            primary
            size="large"
            label="Reset password"
            type="submit"
            disabled={true}
            icon={<Send />}
          />

          <Anchor onClick={handleNavigateTo('/login')}>Go to login</Anchor>
        </FormActions>
      </FormBox>
    </Box>
  )
}
