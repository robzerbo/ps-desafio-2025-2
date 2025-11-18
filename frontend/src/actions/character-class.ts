'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCharacterClass(form: FormData) {
  const res = await api('POST', '/users', { data: form })

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}

export async function updateCharacterClass(form: FormData) {
  const res = await api('POST', `/users/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}

export async function destroyCharacterClass(id: string) {
  const res = await api('DELETE', `/users/${id}`)

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}
