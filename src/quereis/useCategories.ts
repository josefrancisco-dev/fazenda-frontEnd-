
import type { CreateCategoryDTO, UpdateCategoryDTO } from "@/schemas/category"
import { categoryService} from "@/service/categories"
import type { GetParams } from "@/types/typesApi"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { toast } from "sonner"

const CATEGORY_KEY = ['category'] as const

export const useGetAllCategory = (params?: GetParams) => {
  return useQuery({
    queryKey: ['category', params],
    queryFn: async () => {
      const response = await categoryService.getAll(params)
      return response
    },
  })
}

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await categoryService.getById(id)
      return response
    },
    enabled: !!id,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: CATEGORY_KEY,
    mutationFn: async (data: CreateCategoryDTO) => {
      const response = await categoryService.create(data)
      return response
    },

    onSuccess: async () => {
      toast.success('Categoria criada com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEY})
    },

    onError: () => {
      toast.error('Alguma coisa deu errado ao criar categoria !')
    },
  })
}

export const useUpdateCategory = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CATEGORY_KEY,

    mutationFn: async ({id, data
    }: {
      id: string
      data: UpdateCategoryDTO
    }) => {

      const response = await categoryService.update(id, data)
      return response
    },

    onSuccess: async () => {

      toast.success('Categoria actualizada com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })

      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEY,
      })
    },

    onError: () => {
      toast.error('Alguma coisa deu errado ao actualizar categoria !')
    },
  })
}

export const useUpdateCategoryPartial = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CATEGORY_KEY,

    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateCategoryDTO
    }) => {

      await categoryService.patch(id, data)
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEY,
      })

      toast.success('Categoria actualizada com sucesso!', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },

    onError: () => {
      toast.error('Erro ao actualizar categoria.')
    },
  })
}

export const useDeleteCategory = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CATEGORY_KEY,

    mutationFn: async (id: string) => {
      await categoryService.delete(id)
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEY,
      })

      toast.success('Categoria eliminada com sucesso!', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },

    onError: () => {
      toast.error('Erro ao eliminar categoria.')
    },
  })
}