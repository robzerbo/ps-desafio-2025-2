'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { propertyType } from '@/types/property'
import { ResponseErrorType, api } from '@/services/api'
import { characterType } from '@/types/character'
import FormFieldsCharacter from './form-fields-character'

interface DialogUpdateCharacterProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateCharacter({ id, children }: DialogUpdateCharacterProps) {
  const [character, setCharacter] = useState<characterType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<propertyType>('GET', `/properties/${id}`)

      if (response) {
        setCharacter(response)
      } else {
        setCharacter(null)
        toast({
          title: 'Personagem não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setCharacter(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = null 

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o personagem!',
      })
    } else {
      toast({
        title: 'Personagem editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar imóvel</DialogTitle>
          <DialogDescription>
            Atualize as informações do imóvel abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCharacter error={error} character={character} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
