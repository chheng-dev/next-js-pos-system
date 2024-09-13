'use client'

import { theme } from '@/tailwind.config'
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}) {
  return (
    <NextUIProvider theme={theme}>
      {children}
    </NextUIProvider>
  )
}