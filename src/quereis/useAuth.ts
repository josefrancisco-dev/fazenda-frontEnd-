import type { LoginDTO } from "@/schemas/auth"
import { loginService } from "@/service/auth"
import { tokenStorageServices } from "@/storage/token-storage"
import { useUserStore } from "@/stores/useUserStore"
import type { Client } from "@/types/typesApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export function useAuth() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: LoginDTO) => {
      const response = await loginService.create(data)
      return response
    },

    onSuccess: (data) => {
    localStorage.setItem("token", data.token)
    navigate("/dashboard")
    },

  onError: (error: any) => {
  console.log(error)  
  const message =
    error?.response?.data?.message ||
    "Email ou senha inválidos"

  toast.error(message)
}
  })
}

export const useGetMe = () => {
   return useQuery({
    queryKey: ['client'],
    queryFn: async () => {
      const response = await loginService.getMe()
      return response
    },
   })
}

export const useValidateQuery = () => {
  const navigate = useNavigate()
  const token = tokenStorageServices.get()

  const queryResult = useQuery({
    queryKey: ['validate'],
    queryFn: async (): Promise<Client> => {
      
      if (!token) {
        throw new Error('Token não encontrado')
      }

      try {
        const clientData = await loginService.validate()
        return clientData
      } catch (err: any) {
        console.error('❌ Erro na validação:', err)
        if (err.response?.status === 401) {
          tokenStorageServices.remove()
          toast.error('Sessão expirada. Por favor, inicie sessão novamente.')
          navigate('/', { replace: true })
        }
        throw err
      }
    },
    retry: false,
    enabled: !!token,
  })

  return queryResult
}

export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const { clearUser } = useUserStore((state) => state)

  const handleLogout = () => {
    tokenStorageServices.remove()
    clearUser()
    navigate('/', { replace: true })
  }
  return useMutation({
    mutationFn: async () => {
      const token = tokenStorageServices.get()
      if (!token) throw new Error('Token não encontrado')
      return loginService.logout(token)
    },
    onSuccess: handleLogout,
    onError: () => {
      handleLogout()
      toast.error('Ocorreu um erro ao fazer logout')
    },
  })
}

