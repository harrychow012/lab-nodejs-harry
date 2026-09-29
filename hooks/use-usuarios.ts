'use client'

import {
  createUsuario,
  deleteUsuario,
  getUsuarios,
  updateUsuario,
} from '@/service/usuario.service'
import { CreateUsuario, UpdateUsuario, Usuario } from '@/types/usuarios.types'
import { useEffect, useState } from 'react'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios()
      setUsuarios(data)
    } finally {
      setLoading(false)
    }
  }

  const crear = async (usuario: CreateUsuario) => {
    await createUsuario(usuario)
    await cargarUsuarios()
  }

  const actualizar = async (id: number, usuario: UpdateUsuario) => {
    await updateUsuario(id, usuario)
    await cargarUsuarios()
  }

  const eliminar = async (id: number) => {
    await deleteUsuario(id)
    await cargarUsuarios()
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  return {
    usuarios,
    loading,
    crear,
    actualizar,
    eliminar,
  }
}
