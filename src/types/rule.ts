export type AccessLevelCode =
|"Client"
|"Admin"

export type AccessLevelName =
|"Client"
|"Admin"

export type AccessLevel = {
  code: AccessLevelCode;
  name: AccessLevelName;
};

export  type  accessLevelList = AccessLevel[];

export type Role = {
  id: number;
  name: string;
  accessLevel: AccessLevel;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
  countUser: number;
};

export type RoleList = Role[];
