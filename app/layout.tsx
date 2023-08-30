import React from "react";

import { orbitron, exo2 } from "@/app/fonts";
import NavBar from "@/components/NavBar";
import "./globals.css";

interface ILayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: ILayoutProps) => {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="px-4 py-2 flex flex-col min-h-screen bg-orange-50">
        <header>
          <NavBar />
        </header>
        <main className="py-3 grow">{children}</main>
        <footer className="bordet-t py-3 text-xs text-center text-slate-500">
          <p>
            Game data and images courtesy of{" "}
            <a
              href="https://rawg.io/"
              target="_blank"
              className="text-orange-800 hover:underline"
            >
              RAWG.IO
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
