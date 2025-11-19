'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCharacterClass(form: FormData) {
  const res = await api('POST', '/character-classes', { data: form })

  if (!res.error) {
    revalidatePath('/admin/classes')
  }

  return JSON.stringify(res)
}

export async function updateCharacterClass(form: FormData) {
  const res = await api('POST', `/character-classes/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/classes')
  }

  return JSON.stringify(res)
}

export async function destroyCharacterClass(id: string) {
  const res = await api('DELETE', `/character-classes/${id}`)

  if (!res.error) {
    revalidatePath('/admin/classes')
  }

  return JSON.stringify(res)
}
