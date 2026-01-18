import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  GitBranch,
  GitCommit,
  Rocket,
  AlertTriangle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

const pipelines = [
  {
    id: 1,
    project: 'E-Commerce Platform',
    branch: 'main',
    status: 'success',
    stages: [
      { name: 'Build', status: 'success', duration: '2m 34s' },
      { name: 'Test', status: 'success', duration: '5m 12s' },
      { name: 'Security Scan', status: 'success', duration: '3m 45s' },
      { name: 'Deploy Dev', status: 'success', duration: '1m 20s' },
    ],
    commit: 'Fix payment gateway integration',
    author: 'John Doe',
    time: '15 minutes ago',
  },
  {
    id: 2,
    project: 'Mobile Banking App',
    branch: 'feature/biometric-auth',
    status: 'running',
    progress: 65,
    stages: [
      { name: 'Build', status: 'success', duration: '3m 10s' },
      { name: 'Test', status: 'success', duration: '6m 32s' },
      { name: 'Security Scan', status: 'running', duration: '-' },
      { name: 'Deploy Dev', status: 'pending', duration: '-' },
    ],
    commit: 'Add biometric authentication',
    author: 'Jane Smith',
    time: '5 minutes ago',
  },
  {
    id: 3,
    project: 'CRM API',
    branch: 'develop',
    status: 'failed',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 45s' },
      { name: 'Test', status: 'failed', duration: '2m 20s' },
      { name: 'Security Scan', status: 'skipped', duration: '-' },
      { name: 'Deploy Dev', status: 'skipped', duration: '-' },
    ],
    commit: 'Update user endpoints',
    author: 'Mike Johnson',
    time: '1 hour ago',
  },
];

const deployments = [
  { id: 1, project: 'E-Commerce Platform', env: 'Production', version: 'v2.4.1', status: 'success', time: '2h ago' },
  { id: 2, project: 'Analytics Dashboard', env: 'Staging', version: 'v1.8.3', status: 'success', time: '3h ago' },
  { id: 3, project: 'Mobile Banking App', env: 'Production', version: 'v3.2.0', status: 'success', time: '5h ago' },
  { id: 4, project: 'IoT Data Service', env: 'Production', version: 'v1.5.2', status: 'rollback', time: '8h ago' },
  { id: 5, project: 'CRM API', env: 'Development', version: 'v0.9.1', status: 'failed', time: '12h ago' },
];

const environments = [
  { name: 'Development', projects: 45, deployments: 234, uptime: '99.9%', status: 'healthy' },
  { name: 'Staging', projects: 38, deployments: 156, uptime: '99.7%', status: 'healthy' },
  { name: 'Production', projects: 42, deployments: 89, uptime: '99.95%', status: 'healthy' },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-600" />;
    case 'running':
      return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-gray-400" />;
    default:
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
}

function getStatusBadge(status: string) {
  const variants: Record<string, { bg: string; text: string; label: string }> = {
    success: { bg: 'bg-green-100', text: 'text-green-700', label: 'Succès' },
    failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Échec' },
    running: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En cours' },
    rollback: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Rollback' },
    pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'En attente' },
  };

  const variant = variants[status] || variants.pending;
  return (
    <Badge className={`${variant.bg} ${variant.text}`}>
      {variant.label}
    </Badge>
  );
}

export function CICDModule() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CI/CD</h1>
        <p className="text-gray-500 mt-1">Pipelines et déploiements automatisés</p>
      </div>

      {/* Environments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environments.map((env) => (
          <Card key={env.name} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{env.name}</h3>
              <Badge className="bg-green-100 text-green-700">
                {env.status === 'healthy' ? 'Opérationnel' : 'Problème'}
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Projets</span>
                <span className="font-medium">{env.projects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Déploiements (30j)</span>
                <span className="font-medium">{env.deployments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Uptime</span>
                <span className="font-medium text-green-600">{env.uptime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs for Pipelines and Deployments */}
      <Tabs defaultValue="pipelines" className="w-full">
        <TabsList>
          <TabsTrigger value="pipelines">
            <GitBranch className="w-4 h-4 mr-2" />
            Pipelines
          </TabsTrigger>
          <TabsTrigger value="deployments">
            <Rocket className="w-4 h-4 mr-2" />
            Déploiements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Pipelines en cours</h3>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Nouveau Pipeline
              </Button>
            </div>

            <div className="space-y-4">
              {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                  {/* Pipeline Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(pipeline.status)}
                        <h4 className="font-semibold text-lg">{pipeline.project}</h4>
                        {getStatusBadge(pipeline.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          {pipeline.branch}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="w-4 h-4" />
                          {pipeline.commit}
                        </div>
                        <span>by {pipeline.author}</span>
                        <span>{pipeline.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {pipeline.status === 'running' && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {pipeline.status !== 'running' && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Running Pipelines */}
                  {pipeline.status === 'running' && pipeline.progress && (
                    <div className="mb-4">
                      <Progress value={pipeline.progress} className="h-2" />
                      <p className="text-sm text-gray-500 mt-1">{pipeline.progress}% complété</p>
                    </div>
                  )}

                  {/* Pipeline Stages */}
                  <div className="flex gap-2">
                    {pipeline.stages.map((stage, index) => (
                      <div key={index} className="flex-1">
                        <div
                          className={`p-3 rounded-lg border-2 ${
                            stage.status === 'success'
                              ? 'border-green-500 bg-green-50'
                              : stage.status === 'failed'
                              ? 'border-red-500 bg-red-50'
                              : stage.status === 'running'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{stage.name}</span>
                            {getStatusIcon(stage.status)}
                          </div>
                          {stage.duration !== '-' && (
                            <span className="text-xs text-gray-500">{stage.duration}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="deployments" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Historique des Déploiements</h3>
              <Button variant="outline" size="sm">
                <Rocket className="w-4 h-4 mr-2" />
                Nouveau Déploiement
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Environnement</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Version</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Heure</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deployments.map((deployment) => (
                    <tr key={deployment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{deployment.project}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{deployment.env}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{deployment.version}</td>
                      <td className="py-3 px-4">{getStatusBadge(deployment.status)}</td>
                      <td className="py-3 px-4 text-gray-600">{deployment.time}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {deployment.status === 'success' && (
                            <Button variant="outline" size="sm">
                              <RotateCcw className="w-4 h-4 mr-1" />
                              Rollback
                            </Button>
                          )}
                          {deployment.status === 'rollback' && (
                            <Button variant="outline" size="sm">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Détails
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
