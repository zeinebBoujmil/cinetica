'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirige automatiquement vers la page de login
    router.push('/login');
  }, [router]);

 // Ne rien afficher car l'utilisateur est redirigé
}
