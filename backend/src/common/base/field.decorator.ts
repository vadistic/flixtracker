/* eslint-disable @typescript-eslint/no-unsafe-return */
import { applyDecorators } from '@nestjs/common'
import { Field, ID, Int, ReturnTypeFunc, Float } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  IsInt,
  IsEnum,
  ValidateNested,
} from 'class-validator'

export interface ModelRelationOptions {
  nullable?: boolean
}

export const ModelRelation = (typeFn: ReturnTypeFunc, options: ModelRelationOptions = {}) => {
  const typeRet = typeFn()
  const typeVal: any = Array.isArray(typeRet) ? typeRet[0] : typeRet
  const isArray = Array.isArray(typeRet)

  const validators: any[] = []

  if (options.nullable) {
    validators.push(IsOptional())
  }

  if (isArray) {
    validators.push(IsArray())
  }

  return applyDecorators(
    ...validators,
    ValidateNested(),
    Type(() => typeVal) as PropertyDecorator,
    Field(typeFn, {
      nullable: options.nullable,
    }),
    ApiProperty({
      type: typeVal,
      isArray: isArray,
      required: !options.nullable,
    }),
  )
}

export interface ModelFieldOptions {
  enum?: boolean
  nullable?: boolean
}

export const ModelField = (typeFn: ReturnTypeFunc, options: ModelFieldOptions = {}) => {
  const typeRet = typeFn()
  const typeVal = Array.isArray(typeRet) ? typeRet[0] : typeRet
  const isArray = Array.isArray(typeRet)

  // swagger

  let typeSwagger: any = typeVal

  if (typeVal === ID) typeSwagger = String
  if (typeVal === Int || typeVal === Float) typeSwagger = Number

  // validation

  const validators: any[] = []

  if (options.nullable) {
    validators.push(IsOptional())
  }

  if (isArray) {
    validators.push(IsArray())
  }

  if (options.enum) {
    validators.push(IsEnum(typeVal))
  }

  if (typeVal === String || typeVal === ID) {
    validators.push(IsString({ each: isArray }), IsNotEmpty(), Transform(String))
  }

  if (typeVal === Date) {
    validators.push(IsDate({ each: isArray }), Transform(Date))
  }

  if (typeVal === Number || typeVal === Int || typeVal == Float) {
    validators.push(IsNumber({}, { each: isArray }), Transform(Number))
  }

  if (typeVal === Int) {
    validators.push(IsInt())
  }

  return applyDecorators(
    ...validators,
    Field(typeFn, {
      nullable: options.nullable,
    }),
    ApiProperty({
      type: options.enum ? undefined : typeSwagger,
      isArray: isArray,
      required: !options.nullable,
      enum: options.enum ? (typeVal as any) : undefined,
    }),
  )
}
