'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCharacter(form: FormData) {
  const res = await api('POST', '/characters', { data: form })

  if (!res.error) {
    revalidatePath('/admin/personagens')
  }

  return JSON.stringify(res)
}

export async function updateCharacter(form: FormData) {
  const res = await api('POST', `/characters/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/personagens')
  }

  return JSON.stringify(res)
}

export async function destroyCharacter(id: string) {
  const res = await api('DELETE', `/characters/${id}`)

  if (!res.error) {
    revalidatePath('/admin/personagens')
  }

  return JSON.stringify(res)
}
