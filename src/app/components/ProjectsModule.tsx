import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Plus, Search, Globe, Smartphone, Server, Database, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';

const templates = [
  { id: 'web', name: 'Application Web', icon: Globe, description: 'React + Node.js + PostgreSQL', color: 'blue' },
  { id: 'mobile', name: 'Application Mobile', icon: Smartphone, description: 'React Native + API REST', color: 'purple' },
  { id: 'api', name: 'API REST', icon: Server, description: 'Node.js + Express + MongoDB', color: 'green' },
];

const mockProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    client: 'Retail Corp',
    template: 'web',
    status: 'active',
    env: ['dev', 'staging', 'prod'],
    created: '2026-01-10',
    lastDeploy: '2026-01-15 14:30'
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinanceBank',
    template: 'mobile',
    status: 'active',
    env: ['dev', 'staging', 'prod'],
    created: '2026-01-08',
    lastDeploy: '2026-01-16 09:15'
  },
  {
    id: 3,
    name: 'CRM API',
    client: 'Sales Inc',
    template: 'api',
    status: 'pending',
    env: ['dev'],
    created: '2026-01-15',
    lastDeploy: 'N/A'
  },
  {
    id: 4,
    name: 'Analytics Dashboard',
    client: 'DataCorp',
    template: 'web',
    status: 'active',
    env: ['dev', 'staging', 'prod'],
    created: '2025-12-20',
    lastDeploy: '2026-01-14 16:45'
  },
  {
    id: 5,
    name: 'IoT Data Service',
    client: 'Smart Industries',
    template: 'api',
    status: 'maintenance',
    env: ['dev', 'prod'],
    created: '2025-11-15',
    lastDeploy: '2026-01-10 11:20'
  },
];

export function ProjectsModule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-500 mt-1">Gestion centralisée de vos projets DevOps</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Template Selection */}
              <div>
                <Label className="mb-3 block">Sélectionner un template</Label>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-6 h-6 text-gray-700" />
                          <h4 className="font-semibold">{template.name}</h4>
                        </div>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nom du projet</Label>
                  <Input id="projectName" placeholder="Mon Projet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client</Label>
                  <Input id="clientName" placeholder="Nom du client" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description du projet..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository Git</Label>
                <Input id="repository" placeholder="https://github.com/org/repo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environments">Environnements</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner les environnements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Développement uniquement</SelectItem>
                    <SelectItem value="dev-staging">Dev + Staging</SelectItem>
                    <SelectItem value="full">Dev + Staging + Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Créer le Projet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Rechercher un projet ou un client..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Templates Preview */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Templates Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center" style={{justifyItems: 'center'}}>
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-${template.color}-50`}>
                    <Icon className={`w-5 h-5 text-${template.color}-600`} />
                  </div>
                  <h4 className="font-semibold">{template.name}</h4>
                </div>
                <p className="text-sm text-gray-500">{template.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Projects List */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Tous les Projets ({filteredProjects.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Template</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Environnements</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Dernier Déploiement</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{project.name}</td>
                  <td className="py-3 px-4 text-gray-600">{project.client}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{project.template.toUpperCase()}</Badge>
                  </td>
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
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      {project.env.map((env) => (
                        <Badge key={env} variant="outline" className="text-xs">
                          {env}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{project.lastDeploy}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
