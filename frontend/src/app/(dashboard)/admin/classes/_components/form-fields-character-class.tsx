'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { characterClassType } from '@/types/character-class'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsCharacterClassProps {
  characterClass?: characterClassType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCharacterClass({
  characterClass,
  readOnly,
  error,
}: FormFieldsCharacterClassProps) {
  const { pending } = useFormStatus()
  return (
    <>
      <FormFieldsGroup>
        {characterClass && (
          <Input defaultValue={characterClass.id} type="text" name="id" hidden />
        )}
        {/* inserir campos do formulário */}
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
