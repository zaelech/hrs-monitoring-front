import { useSession } from 'next-auth/react';
import { Permission } from '../types/auth';

export const usePermissions = () => {
  const { data: session } = useSession();

  const hasPermission = (permission: Permission): boolean => {
    if (!session?.user?.groups) return false;

    return session.user.groups.some(group => 
      group.permissions.includes(permission)
    );
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
};
