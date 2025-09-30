"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Github } from 'lucide-react';
import { Suspense } from 'react';

const errorMessages: Record<string, string> = {
  Configuration: 'Il y a un problème avec la configuration du serveur.',
  AccessDenied: 'Vous avez refusé l\'accès à votre compte GitHub.',
  Verification: 'Le token a expiré ou a déjà été utilisé.',
  Default: 'Une erreur inattendue s\'est produite.',
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Erreur de connexion
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {errorMessage}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Vous pouvez réessayer de vous connecter ou revenir à l'accueil.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200"
              >
                <Github className="w-5 h-5 mr-3" />
                Réessayer avec GitHub
              </Link>

              <Link
                href="/"
                className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Retour à l'accueil
              </Link>
            </div>

            {error === 'Configuration' && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Si vous êtes l'administrateur, vérifiez la configuration des variables d'environnement GitHub.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
