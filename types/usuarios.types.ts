export interface Usuario {
  id: number
  nombre: string
  correo: string
}

export interface CreateUsuario {
  nombre: string
  correo: string
}

export interface UpdateUsuario {
  nombre?: string
  correo?: string
}
