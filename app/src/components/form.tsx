import { Box, Text, Form as GrommetForm, BoxProps } from 'grommet'
import React from 'react'

export interface FormProps {
  onSubmit: any
}

export const FormBox: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <Box fill align="center" justify="center">
      <Box width="medium">
        <GrommetForm onSubmit={onSubmit} noValidate>
          {children}
        </GrommetForm>
      </Box>
    </Box>
  )
}

export const FormActions: React.FC = ({ children }) => {
  return (
    <Box direction="column" margin={{ vertical: 'medium' }} gap="medium">
      {children}
    </Box>
  )
}

export interface FormCalloutProps extends BoxProps {
  type?: 'error' | 'critical' | 'warning' | 'ok'
}

export const FormCallout: React.FC<FormCalloutProps> = ({ children, type }) => {
  if (!children) return null

  return (
    <Box pad={{ vertical: 'small' }} margin={{ vertical: 'small' }}>
      <Text color={type ? `status-${type}` : undefined}>{children}</Text>
    </Box>
  )
}
