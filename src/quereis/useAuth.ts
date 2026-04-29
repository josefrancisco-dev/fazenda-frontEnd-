import type { LoginDTO } from "@/schemas/auth"
import { loginService } from "@/service/auth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


export function useAuth() {
  
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: LoginDTO) => {
      const response = await loginService.create(data)
      return response
    },

    onSuccess: (data) => {
      // salvar token
    localStorage.setItem("token", data.token)
    navigate("/dashboard")
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

// export const useLogoutMutation = () => {
//   const navigate = useNavigate()
//   const { clearUser } = useUserStore((state) => state)

//   return useMutation({
//     mutationFn: async () => {
//       const token = tokenStorageServices.get()
//       if (!token) throw new Error('Token não encontrado')
//       return authServices.logout(token)
//     },
//     onSuccess: async () => {
//       tokenStorageServices.remove()
//       clearUser()
//       navigate('/sign-in', { replace: true })
//     },
//     onError: () => {
//       toast.error('Ocorreu um erro ao fazer logout')
//     },
//   })
// }



