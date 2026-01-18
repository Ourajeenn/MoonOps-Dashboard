import { Card } from '@/app/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, FolderGit2, GitBranch, Activity, AlertCircle } from 'lucide-react';
import moonopsLogo from '@/assets/moonops-logo.png';
import { Badge } from '@/app/components/ui/badge';

const projectsData = [
  { month: 'Jan', projets: 12 },
  { month: 'Fév', projets: 19 },
  { month: 'Mar', projets: 25 },
  { month: 'Avr', projets: 32 },
  { month: 'Mai', projets: 38 },
  { month: 'Juin', projets: 45 },
];

const deploymentsData = [
  { day: 'Lun', deployments: 24 },
  { day: 'Mar', deployments: 18 },
  { day: 'Mer', deployments: 32 },
  { day: 'Jeu', deployments: 28 },
  { day: 'Ven', deployments: 35 },
  { day: 'Sam', deployments: 12 },
  { day: 'Dim', deployments: 8 },
];

const projectStatusData = [
  { name: 'Actifs', value: 42, color: '#10b981' },
  { name: 'En attente', value: 8, color: '#f59e0b' },
  { name: 'Maintenance', value: 5, color: '#6b7280' },
];

const recentProjects = [
  { name: 'E-Commerce Platform', client: 'Retail Corp', status: 'active', deployments: 145 },
  { name: 'Mobile Banking App', client: 'FinanceBank', status: 'active', deployments: 98 },
  { name: 'CRM System', client: 'Sales Inc', status: 'pending', deployments: 23 },
  { name: 'IoT Dashboard', client: 'Smart Industries', status: 'active', deployments: 67 },
  { name: 'API Gateway', client: 'Tech Solutions', status: 'maintenance', deployments: 234 },
];

export function DashboardOverview() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-full shadow p-1 flex items-center justify-center" style={{width: 56, height: 56}}>
          <img src={moonopsLogo} alt="MoonOps Logo" className="w-14 h-14 object-contain" style={{maxWidth: '100%', maxHeight: '100%'}} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme MoonOps</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Projets Actifs</p>
              <p className="text-3xl font-bold">45</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12% ce mois</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FolderGit2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Déploiements (7j)</p>
              <p className="text-3xl font-bold">157</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+8% vs semaine précédente</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <GitBranch className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Taux de Succès</p>
              <p className="text-3xl font-bold">94.8%</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+2.3% ce mois</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Alertes Critiques</p>
              <p className="text-3xl font-bold">3</p>
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>-40% vs hier</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Growth */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Évolution des Projets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="projets" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Status Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Statut des Projets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Deployments Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Déploiements cette Semaine</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deploymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="deployments" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Projects Table */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Projets Récents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Déploiements</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{project.name}</td>
                  <td className="py-3 px-4 text-gray-600">{project.client}</td>
                  <td className="py-3 px-4">
                    <Badge
                      className={
                        project.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : project.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {project.status === 'active' ? 'Actif' : project.status === 'pending' ? 'En attente' : 'Maintenance'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{project.deployments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
