import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ModernFooter from "@/components/ModernFooter";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COEXIST.AI - Assistant de Coexistence Pacifique",
  description: "Assistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique. Conseils personnalisés pour tous types de situations.",
  keywords: "coexistence,paix,conflits,médiation,IA,résolution,harmonie,communication",
  authors: [{ name: "COEXIST.AI Team" }],
  creator: "COEXIST.AI",
  publisher: "COEXIST.AI",
  robots: "index, follow",
  openGraph: {
    title: "COEXIST.AI - Assistant de Coexistence Pacifique",
    description: "Assistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique.",
    url: "https://coexist-ai.com",
    siteName: "COEXIST.AI",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "COEXIST.AI - Assistant de Coexistence Pacifique",
    description: "Assistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique.",
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "COEXIST.AI",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0ea5e9",
    "msapplication-tap-highlight": "no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('COEXIST.AI: ServiceWorker enregistré avec succès:', registration.scope);
                    }, function(err) {
                      console.log('COEXIST.AI: Échec enregistrement ServiceWorker:', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <ModernFooter />
        <InstallPrompt />
      </body>
    </html>
  );
}