'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/ui/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { LayoutGrid, BookOpen, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || !profile) {
    return null;
  }

  const menuItems = [
    {
      title: 'Mis Programas',
      description: 'Ver y gestionar tus programas activos',
      icon: LayoutGrid,
      href: '/programas',
    },
    {
      title: 'Recursos',
      description: 'Accede a material educativo y guías',
      icon: BookOpen,
      href: '/recursos',
    },
    {
      title: 'Configuración',
      description: 'Gestiona tu perfil y preferencias',
      icon: Settings,
      href: '/configuracion',
    },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Bienvenido, {profile.full_name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {profile.company_name ? `${profile.company_name} · ` : ''}
            {user.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group relative rounded-lg border p-6 hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold leading-none tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
