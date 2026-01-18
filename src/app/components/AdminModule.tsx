import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  Settings,
  Search,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useState } from 'react';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@techconsulting.fr', role: 'Admin', projects: 8, status: 'active', lastLogin: '2026-01-16 14:30' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@techconsulting.fr', role: 'Developer', projects: 12, status: 'active', lastLogin: '2026-01-16 15:20' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@techconsulting.fr', role: 'DevOps', projects: 15, status: 'active', lastLogin: '2026-01-16 13:45' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.williams@techconsulting.fr', role: 'Developer', projects: 6, status: 'active', lastLogin: '2026-01-15 18:00' },
  { id: 5, name: 'Tom Brown', email: 'tom.brown@techconsulting.fr', role: 'Developer', projects: 10, status: 'inactive', lastLogin: '2026-01-10 09:15' },
];

const billingData = [
  { month: 'Juil', revenue: 8500 },
  { month: 'Août', revenue: 9200 },
  { month: 'Sept', revenue: 10100 },
  { month: 'Oct', revenue: 11500 },
  { month: 'Nov', revenue: 12800 },
  { month: 'Déc', revenue: 14200 },
  { month: 'Jan', revenue: 15800 },
];

const projectCosts = [
  { name: 'Infrastructure', value: 12500, color: '#3b82f6' },
  { name: 'Licences', value: 8300, color: '#10b981' },
  { name: 'Support', value: 5200, color: '#f59e0b' },
  { name: 'Formation', value: 3800, color: '#8b5cf6' },
];

const invoices = [
  { id: 1, project: 'E-Commerce Platform', client: 'Retail Corp', amount: 3200, status: 'paid', date: '2026-01-15', dueDate: '2026-01-30' },
  { id: 2, project: 'Mobile Banking App', client: 'FinanceBank', amount: 4500, status: 'paid', date: '2026-01-14', dueDate: '2026-01-29' },
  { id: 3, project: 'CRM API', client: 'Sales Inc', amount: 2100, status: 'pending', date: '2026-01-13', dueDate: '2026-01-28' },
  { id: 4, project: 'Analytics Dashboard', client: 'DataCorp', amount: 3800, status: 'overdue', date: '2026-01-05', dueDate: '2026-01-20' },
  { id: 5, project: 'IoT Data Service', client: 'Smart Industries', amount: 5200, status: 'paid', date: '2026-01-12', dueDate: '2026-01-27' },
];

const usageMetrics = [
  { metric: 'Total Utilisateurs', value: '200', change: '+12%', trend: 'up' },
  { metric: 'Utilisateurs Actifs', value: '186', change: '+8%', trend: 'up' },
  { metric: 'Projets Totaux', value: '45', change: '+15%', trend: 'up' },
  { metric: 'Chiffre d\'Affaires Mensuel', value: '15 800€', change: '+11%', trend: 'up' },
];

export function AdminModule() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-500 mt-1">Gestion des utilisateurs, facturation et reporting</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usageMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{metric.metric}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.change} ce mois</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                {index === 0 && <Users className="w-6 h-6 text-blue-600" />}
                {index === 1 && <Users className="w-6 h-6 text-green-600" />}
                {index === 2 && <BarChart3 className="w-6 h-6 text-purple-600" />}
                {index === 3 && <DollarSign className="w-6 h-6 text-orange-600" />}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs for different admin sections */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="billing">
            <DollarSign className="w-4 h-4 mr-2" />
            Facturation
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reporting
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Gestion des Utilisateurs</h3>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Nouvel Utilisateur
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un utilisateur..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nom</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Rôle</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projets</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Dernière Connexion</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{user.role}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.projects}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {user.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="font-semibold text-lg mb-4">Évolution du Chiffre d'Affaires</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={billingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenu (€)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Cost Distribution */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Répartition des Coûts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectCosts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectCosts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {projectCosts.map((cost) => (
                  <div key={cost.name} className="flex justify-between text-sm">
                    <span className="text-gray-600">{cost.name}</span>
                    <span className="font-medium">{cost.value.toLocaleString()}€</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Invoices */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Facturation par Projet</h3>
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="paid">Payées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="overdue">En retard</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Montant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Échéance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{invoice.project}</td>
                      <td className="py-3 px-4 text-gray-600">{invoice.client}</td>
                      <td className="py-3 px-4 font-medium">{invoice.amount.toLocaleString()}€</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{invoice.date}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{invoice.dueDate}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : invoice.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {invoice.status === 'paid' ? 'Payée' : invoice.status === 'pending' ? 'En attente' : 'En retard'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            {/* Global Statistics */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Statistiques Globales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Taux d'Utilisation de la Plateforme</p>
                  <p className="text-3xl font-bold text-blue-600">93%</p>
                  <p className="text-sm text-green-600 mt-1">+5% vs mois dernier</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Économies Réalisées</p>
                  <p className="text-3xl font-bold text-green-600">10 000€</p>
                  <p className="text-sm text-gray-500 mt-1">Ce mois-ci</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Satisfaction Client</p>
                  <p className="text-3xl font-bold text-purple-600">4.7/5</p>
                  <p className="text-sm text-gray-500 mt-1">Basé sur 45 avis</p>
                </div>
              </div>
            </Card>

            {/* Performance by Project Type */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Performance par Type de Projet</h3>
              <div className="space-y-4">
                {[
                  { type: 'Web', count: 18, success: 95, avgDeploy: '8.2 min' },
                  { type: 'Mobile', count: 12, success: 92, avgDeploy: '12.5 min' },
                  { type: 'API', count: 15, success: 97, avgDeploy: '5.1 min' },
                ].map((type) => (
                  <div key={type.type} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{type.type}</h4>
                      <Badge variant="outline">{type.count} projets</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Taux de succès:</span>
                        <span className="ml-2 font-medium text-green-600">{type.success}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Déploiement moyen:</span>
                        <span className="ml-2 font-medium">{type.avgDeploy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Export Options */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Exporter les Rapports</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Rapport Mensuel (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Données Brutes (CSV)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Rapport Exécutif (XLSX)
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Paramètres Généraux</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom de l'Organisation</label>
                  <Input defaultValue="TechConsulting Group" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email de Contact</label>
                  <Input defaultValue="admin@techconsulting.fr" type="email" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Fuseau Horaire</label>
                  <Select defaultValue="paris">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="london">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="newyork">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Notifications</h3>
              <div className="space-y-4">
                {[
                  'Alertes de déploiement',
                  'Rapports de sécurité',
                  'Factures et paiements',
                  'Nouveaux utilisateurs',
                ].map((notification) => (
                  <div key={notification} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{notification}</span>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Intégrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'GitLab', status: 'connected' },
                  { name: 'GitHub', status: 'connected' },
                  { name: 'Active Directory', status: 'connected' },
                  { name: 'Slack', status: 'disconnected' },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 border rounded-lg flex items-center justify-between">
                    <span className="font-medium">{integration.name}</span>
                    <Badge
                      className={
                        integration.status === 'connected'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {integration.status === 'connected' ? 'Connecté' : 'Déconnecté'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
