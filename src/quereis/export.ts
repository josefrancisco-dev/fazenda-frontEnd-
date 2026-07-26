import { printService } from "@/service/export";
import { useQuery } from "@tanstack/react-query";
import type { GetParams } from "@/types/typesApi"

  export const useStockPrint  = () => {
     return useQuery ({
       queryKey:  ['print-stock'],
       queryFn :  async () => {
          const response = await printService.getStockPrint()
          return response
       },
     }) 
  
  }

  export const useSuppliersPrint  = () => {
     return useQuery ({
       queryKey:  ['print-suppliers'],
       queryFn :  async () => {
          const response = await printService.getSupplierPrint()
          return response
       },
     }) 
  }

  export const useClientsPrint  = (params?: GetParams) => {
     return useQuery ({
       queryKey:  ['print-clients'],
       queryFn :  async () => {
          const response = await printService.getClientsPrint(params)
          return response
       },
     }) 
  }

    export const useProductsPrint  = () => {
     return useQuery ({
       queryKey:  ['print-products'],
       queryFn :  async () => {
          const response = await printService.getProductPrint()
          return response
       },
     }) 
  }

      export const useOrdersPrint  = (params?: GetParams) => {
         return useQuery ({
            queryKey:  ['print-orders', params],
            queryFn :  async () => {
               const response = await printService.getOrdersPrint(params)
               return response
            },
         }) 
      }

   export const useShoppingPrint  = () => {
     return useQuery ({
       queryKey:  ['print-shopping'],
       queryFn :  async () => {
          const response = await printService.getShoppingPrint()
          return response
       },
     }) 
  }