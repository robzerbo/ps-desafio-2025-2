import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'

import { characterClassType } from '@/types/character-class'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCharacterClass } from './dialog-update-character-class'
import { DialogCharacterClassDelete } from './dialog-delete-character-class'
import { DialogInformationCharacterClass } from './dialog-information-character-class'
import { DialogCreateCharacterClass } from './dialog-create-character-class'
import { api } from '@/services/api'

export default async function ListCharacterClass() {
  const { response } = await api<characterClassType[]>('GET', '/character-classes');

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as classes de personagens.
      </DashboardContainer>
    )
  }

  const characterClasses: characterClassType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCharacterClass>
          <Button size="sm">
            <LuPlusCircle />
            Nova Classe de personagem
          </Button>
        </DialogCreateCharacterClass>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characterClasses?.map((characterClass: characterClassType) => (
              <TableRow key={characterClass.id}>
                <TableCell>{characterClass.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCharacterClass id={characterClass.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCharacterClass>
                  <DialogUpdateCharacterClass id={characterClass.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCharacterClass>
                  <DialogCharacterClassDelete id={characterClass.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCharacterClassDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!characterClasses.length && (
            <TableCaption>Nenhuma classe de personagem encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
