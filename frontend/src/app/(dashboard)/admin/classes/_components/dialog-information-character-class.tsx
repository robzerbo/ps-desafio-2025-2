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
import { characterClassType } from '@/types/character-class'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCharacterClassProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCharacterClass({
  id,
  children,
}: DialogInformationCharacterClassProps) {
  const [characterClass, setCharacterClass] = useState<characterClassType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<characterClassType>('GET', `/character-classes/${id}`);

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

    return () => setCharacterClass(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da classe do personagem</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da classe do personagem abaixo.
          </DialogDescription>
        </DialogHeader>
        {characterClass ? (
          <FormFieldsCharacterClass characterClass={characterClass} readOnly />
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  )
}
