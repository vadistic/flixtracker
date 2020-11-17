import { Anchor, Box, Button, FormField, Heading, TextInput } from 'grommet'
import { Send } from 'grommet-icons'
import React from 'react'
import { useForm } from 'react-hook-form'

import { FormActions, FormBox } from '../components/form'
import { handleNavigateTo } from '../routes'
import { isEmail } from '../utils/validation'

// export const RECOVER_MUTATION = gql``

export const RecoverView: React.FC = () => {
  const form = useForm<any>()

  const handleSubmit = form.handleSubmit(async () => {
    //
  })

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <Heading level="2">Recover account</Heading>
        {/* <FormCallout type="error">{error?.message}</FormCallout> */}

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
