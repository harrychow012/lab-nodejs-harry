'use client'

import { FormEvent, useState } from 'react'
import { useUsuarios } from '@/hooks/use-usuarios'
import { Usuario } from '@/types/usuarios.types'

export default function Home() {
  const { usuarios, loading, crear, actualizar, eliminar } = useUsuarios()

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const guardarUsuario = async (e: FormEvent) => {
    e.preventDefault()

    if (editandoId !== null) {
      await actualizar(editandoId, {
        nombre,
        correo,
      })
    } else {
      await crear({
        nombre,
        correo,
      })
    }

    limpiarFormulario()
  }

  const editarUsuario = (usuario: Usuario) => {
    setNombre(usuario.nombre)
    setCorreo(usuario.correo)
    setEditandoId(usuario.id)
  }

  const eliminarUsuario = async (id: number) => {
    await eliminar(id)

    if (editandoId === id) {
      limpiarFormulario()
    }
  }

  const limpiarFormulario = () => {
    setNombre('')
    setCorreo('')
    setEditandoId(null)
  }

  return (
    <main className='min-h-screen bg-zinc-950 px-6 py-12 text-white'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-2 text-3xl font-bold'>Tabla de Usuarios</h1>

        <form
          onSubmit={guardarUsuario}
          className='mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6'
        >
          <h2 className='mb-5 text-xl font-semibold'>
            {editandoId !== null ? 'Editar usuario' : 'Crear usuario'}
          </h2>

          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm text-zinc-400'>Nombre</label>

              <input
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder='Nombre del usuario'
                className='w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500'
                required
              />
            </div>

            <div>
              <label className='mb-2 block text-sm text-zinc-400'>Correo</label>

              <input
                type='email'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder='correo@gmail.com'
                className='w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500'
                required
              />
            </div>
          </div>

          <div className='mt-5 flex gap-3'>
            <button
              type='submit'
              className='rounded-lg bg-white px-5 py-2.5 font-medium text-black hover:bg-zinc-200'
            >
              {editandoId !== null ? 'Actualizar' : 'Guardar'}
            </button>

            {editandoId !== null && (
              <button
                type='button'
                onClick={limpiarFormulario}
                className='rounded-lg border border-zinc-700 px-5 py-2.5 hover:bg-zinc-800'
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className='overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900'>
          <div className='border-b border-zinc-800 px-6 py-4'>
            <h2 className='text-xl font-semibold'>Usuarios registrados</h2>
          </div>

          {loading ? (
            <p className='p-8 text-center text-zinc-400'>
              Cargando usuarios...
            </p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead className='bg-zinc-800/50 text-sm text-zinc-400'>
                  <tr>
                    <th className='px-6 py-4'>ID</th>
                    <th className='px-6 py-4'>Nombre</th>
                    <th className='px-6 py-4'>Correo</th>
                    <th className='px-6 py-4'>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className='border-t border-zinc-800'>
                      <td className='px-6 py-4'>{usuario.id}</td>

                      <td className='px-6 py-4'>{usuario.nombre}</td>

                      <td className='px-6 py-4 text-zinc-400'>
                        {usuario.correo}
                      </td>

                      <td className='px-6 py-4'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => editarUsuario(usuario)}
                            className='rounded-md bg-zinc-700 px-3 py-2 text-sm hover:bg-zinc-600'
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => eliminarUsuario(usuario.id)}
                            className='rounded-md bg-red-950 px-3 py-2 text-sm text-red-300 hover:bg-red-900'
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {usuarios.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className='px-6 py-10 text-center text-zinc-500'
                      >
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
