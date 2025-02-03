import { FC, ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/types/auth';

interface WithPermissionProps {
  children: ReactNode;
  permission: Permission;
  fallback?: ReactNode;
}

export const WithPermission: FC<WithPermissionProps> = ({
  children,
  permission,
  fallback = null
}) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
