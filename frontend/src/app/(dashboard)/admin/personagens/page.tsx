import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { FaCarAlt } from "react-icons/fa";
import ListProperties from './_components/list-properties';
import { Suspense } from 'react'
import { GiCharacter } from 'react-icons/gi';

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
        <GiCharacter />
          Personagens
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua Personagens.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListProperties />
        </Suspense>
      </DashboardMain>
    </>
  )
}
