import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "notes.app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        { /* Import PicoCSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
        { /* Fix FOUC */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function getInitialTheme() {
                const savedTheme = localStorage.getItem("theme");
                if(savedTheme) return savedTheme;
                return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              }

              const initialTheme = getInitialTheme();
              document.documentElement.setAttribute("data-theme", initialTheme);
            })();`}} />
      </head>
      <body className={inter.className}>
        <main className="p-0">
          <div className="flex p-4 gap-8">
            <aside className="max-w-36 h-screen max-h-screen">
              <div className="flex flex-col">
                <h5>@username</h5>
                <ThemeToggle />
              </div>
            </aside>

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
