import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  TrendingUp,
  Server
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

const cpuData = [
  { time: '00:00', usage: 45 },
  { time: '04:00', usage: 35 },
  { time: '08:00', usage: 68 },
  { time: '12:00', usage: 82 },
  { time: '16:00', usage: 75 },
  { time: '20:00', usage: 58 },
  { time: '23:59', usage: 42 },
];

const memoryData = [
  { time: '00:00', usage: 62 },
  { time: '04:00', usage: 58 },
  { time: '08:00', usage: 71 },
  { time: '12:00', usage: 78 },
  { time: '16:00', usage: 73 },
  { time: '20:00', usage: 65 },
  { time: '23:59', usage: 60 },
];

const trafficData = [
  { time: '00:00', in: 120, out: 80 },
  { time: '04:00', in: 90, out: 60 },
  { time: '08:00', in: 450, out: 320 },
  { time: '12:00', in: 680, out: 520 },
  { time: '16:00', in: 590, out: 440 },
  { time: '20:00', in: 340, out: 250 },
  { time: '23:59', in: 150, out: 100 },
];

const responseTimeData = [
  { time: '00:00', avg: 85, p95: 120, p99: 180 },
  { time: '04:00', avg: 75, p95: 110, p99: 165 },
  { time: '08:00', avg: 145, p95: 220, p99: 340 },
  { time: '12:00', avg: 165, p95: 280, p99: 420 },
  { time: '16:00', avg: 135, p95: 210, p99: 310 },
  { time: '20:00', avg: 95, p95: 140, p99: 210 },
  { time: '23:59', avg: 80, p95: 115, p99: 175 },
];

const alerts = [
  { id: 1, severity: 'critical', project: 'E-Commerce Platform', message: 'CPU usage > 90% for 5 minutes', time: '10 min ago', status: 'active' },
  { id: 2, severity: 'warning', project: 'Mobile Banking App', message: 'Response time > 500ms', time: '25 min ago', status: 'active' },
  { id: 3, severity: 'info', project: 'Analytics Dashboard', message: 'Disk usage at 75%', time: '1h ago', status: 'acknowledged' },
  { id: 4, severity: 'critical', project: 'CRM API', message: 'Service unavailable (502)', time: '2h ago', status: 'resolved' },
  { id: 5, severity: 'warning', project: 'IoT Data Service', message: 'Memory usage increasing', time: '3h ago', status: 'resolved' },
];

const logs = [
  { time: '16:23:45', level: 'ERROR', project: 'E-Commerce Platform', message: 'Failed to connect to database: Connection timeout' },
  { time: '16:22:30', level: 'WARN', project: 'Mobile Banking App', message: 'High response time detected on /api/transactions' },
  { time: '16:21:15', level: 'INFO', project: 'Analytics Dashboard', message: 'Successfully deployed version 1.8.3 to staging' },
  { time: '16:20:00', level: 'ERROR', project: 'CRM API', message: 'Authentication failed for user: invalid token' },
  { time: '16:19:45', level: 'INFO', project: 'IoT Data Service', message: 'Received 1,234 sensor readings in last minute' },
  { time: '16:18:30', level: 'WARN', project: 'E-Commerce Platform', message: 'Rate limit approaching for API key: xxx-xxx' },
  { time: '16:17:15', level: 'INFO', project: 'Mobile Banking App', message: 'Cache cleared successfully' },
];

const projects = [
  { name: 'E-Commerce Platform', status: 'healthy', uptime: '99.95%', requests: '12.5K/min', errors: '0.2%' },
  { name: 'Mobile Banking App', status: 'warning', uptime: '99.87%', requests: '8.3K/min', errors: '1.2%' },
  { name: 'Analytics Dashboard', status: 'healthy', uptime: '99.99%', requests: '3.2K/min', errors: '0.1%' },
  { name: 'CRM API', status: 'critical', uptime: '98.45%', requests: '5.1K/min', errors: '3.8%' },
  { name: 'IoT Data Service', status: 'healthy', uptime: '99.92%', requests: '15.7K/min', errors: '0.3%' },
];

function getSeverityBadge(severity: string) {
  const variants: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-700' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    info: { bg: 'bg-blue-100', text: 'text-blue-700' },
  };
  const variant = variants[severity] || variants.info;
  return <Badge className={`${variant.bg} ${variant.text}`}>{severity.toUpperCase()}</Badge>;
}

function getStatusBadge(status: string) {
  const variants: Record<string, { bg: string; text: string; icon: any }> = {
    healthy: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle },
    critical: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
  };
  const variant = variants[status] || variants.healthy;
  const Icon = variant.icon;
  return (
    <Badge className={`${variant.bg} ${variant.text} flex items-center gap-1`}>
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}

function getLogLevelBadge(level: string) {
  const variants: Record<string, { bg: string; text: string }> = {
    ERROR: { bg: 'bg-red-100', text: 'text-red-700' },
    WARN: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    INFO: { bg: 'bg-blue-100', text: 'text-blue-700' },
  };
  const variant = variants[level] || variants.INFO;
  return <Badge className={`${variant.bg} ${variant.text} text-xs`}>{level}</Badge>;
}

export function MonitoringModule() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring</h1>
          <p className="text-gray-500 mt-1">Surveillance en temps réel de vos applications</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="24h">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 heure</SelectItem>
              <SelectItem value="24h">24 heures</SelectItem>
              <SelectItem value="7d">7 jours</SelectItem>
              <SelectItem value="30d">30 jours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Rafraîchir
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">CPU Moyen</p>
          <p className="text-3xl font-bold">58%</p>
          <p className="text-sm text-gray-500 mt-2">Peak: 82%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Mémoire Moyenne</p>
          <p className="text-3xl font-bold">67%</p>
          <p className="text-sm text-gray-500 mt-2">Peak: 78%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Requêtes/min</p>
          <p className="text-3xl font-bold">44.8K</p>
          <p className="text-sm text-gray-500 mt-2">+15% vs hier</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Temps Réponse Moyen</p>
          <p className="text-3xl font-bold">125ms</p>
          <p className="text-sm text-gray-500 mt-2">P95: 280ms</p>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="traffic">Trafic</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Utilisation CPU (24h)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cpuData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#3b82f680" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Utilisation Mémoire (24h)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={memoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="usage" stroke="#8b5cf6" fill="#8b5cf680" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Temps de Réponse (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={2} name="Moyenne" />
                <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} name="P95" />
                <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} name="P99" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Trafic Réseau (24h)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="in" stackId="1" stroke="#3b82f6" fill="#3b82f680" name="Entrant (MB/s)" />
                <Area type="monotone" dataKey="out" stackId="2" stroke="#10b981" fill="#10b98180" name="Sortant (MB/s)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">État des Projets</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Uptime</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Requêtes/min</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Taux d'erreur</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4">{getStatusBadge(project.status)}</td>
                      <td className="py-3 px-4 text-gray-600">{project.uptime}</td>
                      <td className="py-3 px-4 text-gray-600">{project.requests}</td>
                      <td className="py-3 px-4">
                        <span className={parseFloat(project.errors) > 2 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {project.errors}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alerts and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Alertes Récentes</h3>
            <Badge className="bg-red-100 text-red-700">2 actives</Badge>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 border rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  {getSeverityBadge(alert.severity)}
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="font-medium text-sm mb-1">{alert.project}</p>
                <p className="text-sm text-gray-600">{alert.message}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Logs en Temps Réel</h3>
            <Button variant="outline" size="sm">
              <Server className="w-4 h-4 mr-2" />
              Voir tout
            </Button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="p-2 border-l-4 border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 font-mono">{log.time}</span>
                  {getLogLevelBadge(log.level)}
                  <span className="text-xs font-medium">{log.project}</span>
                </div>
                <p className="text-gray-700 font-mono text-xs">{log.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
