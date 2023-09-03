import React from "react";

import NavLink from "@/components/NavLink";

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/" className="font-bold font-orbitron">
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
