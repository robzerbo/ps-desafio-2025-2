import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCharacter } from './dialog-update-character'
import { DialogCharacterDelete } from './dialog-delete-character'
import { DialogInformationCharacter } from './dialog-information-character'
import { DialogCreateCharacter} from './dialog-create-character'
import { characterType } from '@/types/character'

export default async function ListProperties() {
  const { response } = null // requisicao para api

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os personagens.
      </DashboardContainer>
    )
  }

  const characters: characterType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCharacter>
          <Button size="sm">
            <LuPlusCircle />
            Novo imóvel
          </Button>
        </DialogCreateCharacter>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters?.map((character: characterType) => (
              <TableRow key={character.id}>
                <TableCell>
                  <TabbleCellImage src={character.image} />
                </TableCell>
                
                <TableCell>{character.title}</TableCell>
                <TableCell>{character.amount}</TableCell>
                <TableCell>{character.category.name}</TableCell>
                {/* demais propriedades de propertyType */}
                
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCharacter id={character.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCharacter>
                  <DialogUpdateCharacter id={character.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCharacter>
                  <DialogCharacterDelete id={character.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCharacterDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!characters.length && (
            <TableCaption>Nenhum personagem encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
