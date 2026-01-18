import { 
  LayoutDashboard, 
  FolderGit2, 
  GitBranch, 
  Activity, 
  Settings, 
  Shield,
  LogOut,
  LifeBuoy
} from 'lucide-react';
import moonopsLogo from '@/assets/moonops-logo.png';
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projets', icon: FolderGit2 },
  { id: 'cicd', label: 'CI/CD', icon: GitBranch },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'helpdesk', label: 'Help Desk', icon: LifeBuoy },
  { id: 'admin', label: 'Administration', icon: Settings },
];

export function Sidebar({ activeView, onViewChange, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full shadow p-1 flex items-center justify-center" style={{width: 48, height: 48}}>
            <img src={moonopsLogo} alt="MoonOps Logo" className="w-12 h-12 object-contain" style={{maxWidth: '100%', maxHeight: '100%'}} />
          </div>
          <div>
            <h1 className="font-bold text-xl">MoonOps</h1>
            <p className="text-xs text-gray-500">Plateforme Multi-tenant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    activeView === item.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin DevOps</p>
            <p className="text-xs text-gray-500 truncate">admin@techconsulting.fr</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}