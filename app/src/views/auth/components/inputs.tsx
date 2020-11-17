import { FormField, TextInput } from 'grommet'
import React from 'react'
import { UseFormMethods } from 'react-hook-form'

import { isEmail } from '../../../utils/validation'

export interface FormFieldProps<T extends Record<string, any>> {
  name: keyof T
  form: UseFormMethods<T>

  label?: string
}

// ────────────────────────────────────────────────────────────────────────────────

export const EmailFormField = <T extends Record<string, any>>({
  name,
  form,
  label,
}: FormFieldProps<T>) => {
  return (
    <FormField label={label ?? 'Email'} error={(form.errors[name] as any)?.message}>
      <TextInput
        name={name as string}
        type="email"
        ref={form.register({
          required: 'Field required',
          validate: {
            isEmail: value => isEmail(value) || 'Not a valid email',
          },
        })}
        required></TextInput>
    </FormField>
  )
}

// ────────────────────────────────────────────────────────────────────────────────

// TODO: mask
export const CodeFormField = <T extends Record<string, any>>({
  name,
  form,
  label,
}: FormFieldProps<T>) => {
  return (
    <FormField label={label ?? 'Code'} error={(form.errors[name] as any)?.message}>
      <TextInput
        name="code"
        type="number"
        ref={form.register({
          required: 'Field required',
          minLength: { value: 6, message: 'Provide all 6 digits' },
          maxLength: { value: 6, message: 'Provide only 6 digits' },
        })}></TextInput>
    </FormField>
  )
}

// ────────────────────────────────────────────────────────────────────────────────

export const PasswordFormField = <T extends Record<string, any>>({
  name,
  form,
  label,
}: FormFieldProps<T>) => {
  return (
    <FormField label={label ?? 'Password'} error={(form.errors[name] as any)?.message}>
      <TextInput
        name="password"
        type="password"
        ref={form.register({
          required: 'Field required',
          minLength: { value: 8, message: 'Password too short' },
        })}
        required></TextInput>
    </FormField>
  )
}

export interface ConfirmPasswordFormProps<T extends Record<string, any>> extends FormFieldProps<T> {
  compareName: keyof T
}

export const ConfirmPasswordFormField = <T extends Record<string, any>>({
  name,
  compareName,
  form,
  label,
}: ConfirmPasswordFormProps<T>) => {
  return (
    <FormField label={label ?? 'Confirm Password'} error={(form.errors[name] as any)?.message}>
      <TextInput
        name="password"
        type="password"
        ref={form.register({
          required: 'Field required',
          minLength: { value: 8, message: 'Password too short' },
          validate: {
            matchPassword: data =>
              data === form.watch(compareName as string) || 'Passwords must match',
          },
        })}
        required></TextInput>
    </FormField>
  )
}
