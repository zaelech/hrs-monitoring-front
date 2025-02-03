export type Permission = 
  | 'READ_LOCATIONS'
  | 'WRITE_LOCATIONS'
  | 'MANAGE_USERS'
  | 'ADMIN_PANEL';

export interface Group {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
}

// Extension du type User de NextAuth
declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    groups?: Group[];
  }

  interface Session {
    user: User & {
      id: string;
      groups?: Group[];
    };
  }
}
