import type { Role } from './rule'
import type { clientSchemaTDO } from '@/schemas/client'

export type UserStatus = 'Active' | 'Inactive' | 'Pending'
export type UserRole = 'Administrador' | 'Editor' | 'Visualizador'

export type User = Omit<clientSchemaTDO, 'role_id' | 'departament_id'> & {
  id: number
  role: Role
}
