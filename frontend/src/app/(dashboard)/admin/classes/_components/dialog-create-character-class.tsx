'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCharacterClass from './form-fields-character-class'
import { createCharacterClass } from '@/actions/character-class'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateCharacterClassProps {
  children: React.ReactNode
}

export function DialogCreateCharacterClass({ children }: DialogCreateCharacterClassProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await createCharacterClass(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar a classe de personagem!',
      })
    } else {
      toast({
        title: 'Classe de personagem criada com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Classe de personagem</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova classe de personagem abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCharacterClass error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
