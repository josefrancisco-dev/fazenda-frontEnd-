import { queryClient } from "@/lib/tanstack";
import { roleService } from "@/service/roles";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getAll().then((resp) => resp.data),
  });

export const useRole = (id: string) =>
  useQuery({
    queryKey: ["role", id],
    queryFn: () => roleService.getById(id),
  });

export const useDeleteRole = () =>
  useMutation({
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
