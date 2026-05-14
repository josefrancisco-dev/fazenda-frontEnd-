import { printService } from "@/service/export";
import { useQuery } from "@tanstack/react-query";


  export const useStockPrint  = () => {
     return useQuery ({
       queryKey:  ['print-stock'],
       queryFn :  async () => {
          const response = await printService.getStockPrint()
          return response
       },
     }) 
  
  }