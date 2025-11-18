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
import { updateCharacterClass } from '@/actions/character-class'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { characterClassType } from '@/types/character-class'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateCharacterClassProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateCharacterClass({
  id,
  children,
}: DialogUpdateCharacterClassProps) {
  const [characterClass, setCharacterClass] = useState<characterClassType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = null // requisicao para api

      if (response) {
        setCharacterClass(response)
      } else {
        setCharacterClass(null)
        toast({
          title: 'Classe do personagem não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setCharacterClass(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateCharacterClass(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar a classe do personagem!',
      })
    } else {
      toast({
        title: 'Classe do personagem editada com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar classe do personagem</DialogTitle>
          <DialogDescription>
            Atualize as informações da classe do personagem abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCharacterClass error={error} characterClass={characterClass} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
