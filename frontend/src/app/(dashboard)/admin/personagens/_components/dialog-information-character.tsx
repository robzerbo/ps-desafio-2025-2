'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { characterType } from '@/types/character'
import FormFieldsCharacter from './form-fields-character'

interface DialogInformationCharacterProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCharacter({
  id,
  children,
}: DialogInformationCharacterProps) {
  const [character, setCharacter] = useState<characterType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = null

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

    return () => setCharacter(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do personagem</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do personagem abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsCharacter character={character} readOnly />
      </DialogContent>
    </Dialog>
  )
}
