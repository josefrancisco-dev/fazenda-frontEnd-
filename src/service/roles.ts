import { api } from "@/api";
import type { Role } from "@/types/rule";
import type { AxiosResponse } from "axios";

class RoleService {
  getAll(): Promise<AxiosResponse<Role[]>> {
    return api.get<Role[]>("/roles");
  }

  getById(id: string) {
    return api.get(`/roles/${id}`);
  }

  update(id: string, data: any) {
    return api.put(`/roles/${id}`, data);
  }

  delete(id: string) {
    return api.delete(`/roles/${id}`);
  }
}

export const roleService = new RoleService();
