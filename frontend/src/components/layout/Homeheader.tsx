import { useAuth } from '@context/AuthContext';
import { DropdownMenuAvatar } from '@ui/dropdown-menu-avatar';
import sol from '@assets/sol.png';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'BOM DIA';
  if (h < 18) return 'BOA TARDE';
  return 'Boa noite';
}

export function Homeheader() {
  const { user } = useAuth();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-semi flex items-center text-xs font-semibold">
          <img src={sol} alt="" />
          <span>{getGreeting()}</span>
        </p>
        <h1 className="text-titulo md:2xl text-2xl font-extrabold md:text-3xl">
          {user?.name.split(' ')[0] || 'Usuário'}
        </h1>
      </div>
      <DropdownMenuAvatar />
    </div>
  );
}
