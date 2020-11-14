/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'

declare module '@emotion/react' {
  import { Theme as _Theme } from '@chakra-ui/react'
  export interface Theme extends _Theme {}
}
