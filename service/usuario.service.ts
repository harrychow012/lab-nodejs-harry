import { CreateUsuario, UpdateUsuario, Usuario } from '@/types/usuarios.types'

const API_URL = 'http://localhost:4000/usuarios'

export async function getUsuarios(): Promise<Usuario[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Error al obtener usuarios')
  }

  return response.json()
}

export async function createUsuario(usuario: CreateUsuario): Promise<Usuario> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })

  if (!response.ok) {
    throw new Error('Error al crear usuario')
  }

  return response.json()
}

export async function updateUsuario(
  id: number,
  usuario: UpdateUsuario,
): Promise<Usuario> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })

  if (!response.ok) {
    throw new Error('Error al actualizar usuario')
  }

  return response.json()
}

export async function deleteUsuario(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Error al eliminar usuario')
  }

  return response.json()
}
