import { Box, BoxProps, Text } from 'grommet'
import React from 'react'

export interface CalloutProps extends BoxProps {
  type?: 'error' | 'critical' | 'warning' | 'ok'
}

export const Callout: React.FC<CalloutProps> = ({ children, type = 'error' }) => {
  return (
    <Box pad="small">
      <Text size="small" color={type ? 'status-' + type : undefined}>
        {children}
      </Text>
    </Box>
  )
}
