import { WithPermission } from './WithPermission';

export const AdminPanel = () => {
  return (
    <WithPermission 
      permission="ADMIN_PANEL"
      fallback={<div>Accès non autorisé</div>}
    >
      <div>
        <h1>Panneau d'administration</h1>
        {/* Contenu du panneau d'administration */}
      </div>
    </WithPermission>
  );
};
