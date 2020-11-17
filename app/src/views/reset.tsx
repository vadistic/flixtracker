import { TextInput } from 'grommet'
import React from 'react'
import { useForm } from 'react-hook-form'

export const ResetView: React.FC = () => {
  const form = useForm<any>()

  const handleSubmit = form.handleSubmit(async () => {
    //
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="email" type="email"></TextInput>
    </form>
  )
}
