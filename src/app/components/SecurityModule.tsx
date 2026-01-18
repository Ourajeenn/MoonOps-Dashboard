import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileSearch,
  Lock,
  Key,
  Eye,
  Download,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

const vulnerabilities = [
  { id: 1, severity: 'critical', title: 'SQL Injection vulnerability', project: 'CRM API', package: 'mysql-connector v2.1.3', cvss: 9.8, status: 'open', discovered: '2h ago' },
  { id: 2, severity: 'high', title: 'XSS vulnerability in input validation', project: 'E-Commerce Platform', package: 'react-forms v3.2.1', cvss: 7.5, status: 'open', discovered: '5h ago' },
  { id: 3, severity: 'medium', title: 'Outdated dependency with known issues', project: 'Mobile Banking App', package: 'jwt-library v1.8.0', cvss: 5.3, status: 'in-progress', discovered: '1d ago' },
  { id: 4, severity: 'high', title: 'Authentication bypass possible', project: 'Analytics Dashboard', package: 'auth-service v2.0.1', cvss: 8.1, status: 'open', discovered: '2d ago' },
  { id: 5, severity: 'low', title: 'Information disclosure in error messages', project: 'IoT Data Service', package: 'error-handler v1.0.5', cvss: 3.7, status: 'resolved', discovered: '3d ago' },
  { id: 6, severity: 'critical', title: 'Remote code execution', project: 'E-Commerce Platform', package: 'file-upload v4.1.2', cvss: 9.9, status: 'open', discovered: '4d ago' },
];

const complianceChecks = [
  { id: 1, name: 'RGPD - Protection des données', projects: 45, passed: 42, failed: 3, score: 93 },
  { id: 2, name: 'ISO 27001 - Sécurité de l\'information', projects: 45, passed: 38, failed: 7, score: 84 },
  { id: 3, name: 'PCI DSS - Sécurité des paiements', projects: 12, passed: 10, failed: 2, score: 83 },
  { id: 4, name: 'OWASP Top 10', projects: 45, passed: 40, failed: 5, score: 89 },
];

const auditLogs = [
  { id: 1, action: 'User Login', user: 'admin@techconsulting.fr', ip: '192.168.1.100', time: '2026-01-16 15:30:25', status: 'success' },
  { id: 2, action: 'Project Created', user: 'john.doe@techconsulting.fr', ip: '192.168.1.105', time: '2026-01-16 15:25:10', status: 'success' },
  { id: 3, action: 'Deployment to Production', user: 'jane.smith@techconsulting.fr', ip: '192.168.1.112', time: '2026-01-16 15:20:45', status: 'success' },
  { id: 4, action: 'Failed Login Attempt', user: 'unknown@example.com', ip: '203.0.113.45', time: '2026-01-16 15:15:30', status: 'failed' },
  { id: 5, action: 'API Key Generated', user: 'admin@techconsulting.fr', ip: '192.168.1.100', time: '2026-01-16 15:10:15', status: 'success' },
  { id: 6, action: 'User Permissions Changed', user: 'admin@techconsulting.fr', ip: '192.168.1.100', time: '2026-01-16 15:05:00', status: 'success' },
  { id: 7, action: 'Database Backup', user: 'system', ip: '127.0.0.1', time: '2026-01-16 15:00:00', status: 'success' },
  { id: 8, action: 'Security Scan Initiated', user: 'admin@techconsulting.fr', ip: '192.168.1.100', time: '2026-01-16 14:55:30', status: 'success' },
];

const securityScores = [
  { project: 'E-Commerce Platform', score: 72, vulnerabilities: 8, lastScan: '1h ago' },
  { project: 'Mobile Banking App', score: 88, vulnerabilities: 2, lastScan: '2h ago' },
  { project: 'CRM API', score: 65, vulnerabilities: 12, lastScan: '3h ago' },
  { project: 'Analytics Dashboard', score: 91, vulnerabilities: 1, lastScan: '4h ago' },
  { project: 'IoT Data Service', score: 79, vulnerabilities: 5, lastScan: '5h ago' },
];

function getSeverityBadge(severity: string) {
  const variants: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-700' },
    high: { bg: 'bg-orange-100', text: 'text-orange-700' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    low: { bg: 'bg-blue-100', text: 'text-blue-700' },
  };
  const variant = variants[severity] || variants.low;
  return <Badge className={`${variant.bg} ${variant.text}`}>{severity.toUpperCase()}</Badge>;
}

function getStatusBadge(status: string) {
  const variants: Record<string, { bg: string; text: string; label: string }> = {
    open: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ouvert' },
    'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En cours' },
    resolved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Résolu' },
  };
  const variant = variants[status] || variants.open;
  return <Badge className={`${variant.bg} ${variant.text}`}>{variant.label}</Badge>;
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

function getScoreBgColor(score: number) {
  if (score >= 90) return 'bg-green-600';
  if (score >= 70) return 'bg-yellow-600';
  return 'bg-red-600';
}

export function SecurityModule() {
  const criticalCount = vulnerabilities.filter(v => v.severity === 'critical' && v.status === 'open').length;
  const highCount = vulnerabilities.filter(v => v.severity === 'high' && v.status === 'open').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sécurité</h1>
          <p className="text-gray-500 mt-1">Scan de vulnérabilités et conformité</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button>
            <FileSearch className="w-4 h-4 mr-2" />
            Nouveau Scan
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Vulnérabilités Critiques</p>
          <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
          <p className="text-sm text-gray-500 mt-2">Nécessite action immédiate</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <XCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Vulnérabilités Hautes</p>
          <p className="text-3xl font-bold text-orange-600">{highCount}</p>
          <p className="text-sm text-gray-500 mt-2">À traiter rapidement</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Conformité Moyenne</p>
          <p className="text-3xl font-bold text-green-600">87%</p>
          <p className="text-sm text-gray-500 mt-2">+3% ce mois</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Scans Aujourd'hui</p>
          <p className="text-3xl font-bold">23</p>
          <p className="text-sm text-gray-500 mt-2">Sur 45 projets</p>
        </Card>
      </div>

      {/* Tabs for different security views */}
      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList>
          <TabsTrigger value="vulnerabilities">
            <Shield className="w-4 h-4 mr-2" />
            Vulnérabilités
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Conformité
          </TabsTrigger>
          <TabsTrigger value="audit">
            <Eye className="w-4 h-4 mr-2" />
            Audit Trails
          </TabsTrigger>
          <TabsTrigger value="scores">
            <Lock className="w-4 h-4 mr-2" />
            Scores de Sécurité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Vulnérabilités Détectées</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sévérité</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Titre</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Projet</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Package</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">CVSS</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Découvert</th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map((vuln) => (
                    <tr key={vuln.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{getSeverityBadge(vuln.severity)}</td>
                      <td className="py-3 px-4 font-medium">{vuln.title}</td>
                      <td className="py-3 px-4 text-gray-600">{vuln.project}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{vuln.package}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${vuln.cvss >= 9 ? 'text-red-600' : vuln.cvss >= 7 ? 'text-orange-600' : 'text-yellow-600'}`}>
                          {vuln.cvss}
                        </span>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(vuln.status)}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{vuln.discovered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <div className="space-y-6">
            {complianceChecks.map((check) => (
              <Card key={check.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{check.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{check.projects} projets évalués</span>
                      <span className="text-green-600">{check.passed} conformes</span>
                      <span className="text-red-600">{check.failed} non-conformes</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${getScoreColor(check.score)}`}>
                      {check.score}%
                    </p>
                    <p className="text-sm text-gray-500">Score de conformité</p>
                  </div>
                </div>
                <Progress value={check.score} className="h-2" />
              </Card>
            ))}

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Certifications et Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium">ISO 27001</p>
                    <p className="text-sm text-gray-500">Certifié</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium">RGPD</p>
                    <p className="text-sm text-gray-500">Conforme</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-medium">SOC 2</p>
                    <p className="text-sm text-gray-500">En cours</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Historique des Actions</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Utilisateur</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Adresse IP</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date/Heure</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{log.action}</td>
                      <td className="py-3 px-4 text-gray-600">{log.user}</td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{log.ip}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{log.time}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            log.status === 'success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {log.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scores" className="mt-6">
          <div className="space-y-4">
            {securityScores.map((project, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{project.project}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{project.vulnerabilities} vulnérabilités</Badge>
                      <span className="text-gray-500">Dernier scan: {project.lastScan}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-4xl font-bold ${getScoreColor(project.score)}`}>
                          {project.score}
                        </p>
                        <p className="text-sm text-gray-500">Security Score</p>
                      </div>
                      <div className="w-16 h-16 rounded-full flex items-center justify-center border-4" style={{ borderColor: project.score >= 90 ? '#10b981' : project.score >= 70 ? '#f59e0b' : '#ef4444' }}>
                        <Shield className={`w-8 h-8 ${getScoreColor(project.score)}`} />
                      </div>
                    </div>
                  </div>
                </div>
                <Progress value={project.score} className="h-2" />
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
