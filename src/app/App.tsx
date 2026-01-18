import { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { DashboardOverview } from '@/app/components/DashboardOverview';
import { ProjectsModule } from '@/app/components/ProjectsModule';
import { CICDModule } from '@/app/components/CICDModule';
import { MonitoringModule } from '@/app/components/MonitoringModule';
import { SecurityModule } from '@/app/components/SecurityModule';
import { AdminModule } from '@/app/components/AdminModule';
import { LoginPage } from '@/app/components/LoginPage';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('dashboard'); // Reset to dashboard on logout
  };

  // Afficher la page de connexion si non authentifié
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && <DashboardOverview />}
        {activeView === 'projects' && <ProjectsModule />}
        {activeView === 'cicd' && <CICDModule />}
        {activeView === 'monitoring' && <MonitoringModule />}
        {activeView === 'security' && <SecurityModule />}
        {activeView === 'admin' && <AdminModule />}
      </main>
    </div>
  );
}