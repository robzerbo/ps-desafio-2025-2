import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuLayers } from 'react-icons/lu'
import ListCharacterClass from './_components/list-character-class'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuLayers />
          Classes de personagens
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua Classes de personagens.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListCharacterClass />
        </Suspense>
      </DashboardMain>
    </>
  )
}
