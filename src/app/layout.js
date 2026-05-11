import {
  Orbitron,
  Rajdhani,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
  keywords: [
    "IA fitness",
    "programme entraînement",
    "coaching sportif",
    "musculation IA",
    "nutrition personnalisée",
  ],
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
