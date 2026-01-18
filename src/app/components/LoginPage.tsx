import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Lock, Mail } from 'lucide-react';
import moonopsLogo from '@/assets/moonops-logo.png';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation email
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation mot de passe
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }


    // Validation termes et conditions
    if (!acceptTerms) {
      newErrors.terms = 'Vous devez accepter les termes et conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulation de connexion
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <img src={moonopsLogo} alt="MoonOps Logo" className="w-32 h-32 object-contain mb-2" style={{maxWidth: '100%', maxHeight: '100%'}} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">MoonOps<br /><span className='text-3xl'>DevOps Central</span></h1>
          <div className="mt-2">
            <p className="text-lg text-gray-500 font-medium">TechConsulting Group</p>
            <p className="text-base text-gray-400">Plateforme Multi-tenant</p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="admin@techconsulting.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>


          {/* Termes et conditions */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className={errors.terms ? 'border-red-500' : ''}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-relaxed cursor-pointer"
              >
                J'accepte les{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  termes et conditions
                </a>{' '}
                de la plateforme DevOps Central
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}
          </div>

          {/* Bouton de connexion */}
          <Button type="submit" className="w-full py-6 text-lg">
            Connexion
          </Button>

          {/* Info demo */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">🎯 Compte de démonstration :</p>
            <p className="text-xs text-blue-700">Email : admin@techconsulting.fr</p>
            <p className="text-xs text-blue-700">Mot de passe : demo2026</p>
            <p className="text-xs text-blue-600 mt-2 italic">
              (Ou utilisez n'importe quel email valide avec un mot de passe de 6+ caractères)
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2026 TechConsulting Group - DevOps Central Platform
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Version 1.0.0 | 50€/dev/mois - 200 développeurs
          </p>
        </div>
      </Card>
    </div>
  );
}
