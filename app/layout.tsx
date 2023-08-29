import React from "react";

interface ILayoutProps { children: React.ReactNode }

const RootLayout = ({ children }: ILayoutProps) => {
  return (
    <html lang="en">
      <body>
        <header>[header]</header>
        <main>{children}</main>
        <footer>[footer]</footer>
      </body>
    </html>
  );
};

export default RootLayout;
