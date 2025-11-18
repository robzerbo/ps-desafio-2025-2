'use client'

import { destroyCharacterClass } from '@/actions/character-class'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateCharacterClassProps {
  id: string
  children: React.ReactNode
}

export function DialogCharacterClassDelete({
  id,
  children,
}: DialogCreateCharacterClassProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroyCharacterClass(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir a classe do personagem!',
      })
    } else {
      toast({
        title: 'Classe do personagem deletada com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de classe de personagem</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir esta classe de personagem? Esta ação é
            irreversível e removerá permanentemente a classe de personagem do sistema.
            Deseja continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
