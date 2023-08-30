import React from "react";
import Link from "next/link";

interface ILayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: ILayoutProps) => {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/reviews">Reviews</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            Game data and images courtesy of{" "}
            <a href="https://rawg.io/" target="_blank">
              RAWG.IO
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
