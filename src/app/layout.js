import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NEUREX — L'IA qui construit ton physique",
  description:
    "Plateforme intelligente de génération de programmes d'entraînement personnalisés. Analyse biométrique avancée, programme optimisé par IA, nutrition et progression sur mesure.",
  applicationName: "NEUREX",
  themeColor: "#050507",
  keywords: [
    "IA fitness",
    "programme entraînement",
    "coaching sportif",
    "musculation IA",
    "nutrition personnalisée",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-white">
        {children}
      </body>
    </html>
  );
}
