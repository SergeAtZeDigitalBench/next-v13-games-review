import React from "react";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link
            href="/"
            className="text-orange-800 hover:underline font-bold font-orbitron"
          >
            Indie Gamer
          </Link>
        </li>
        <li className="ml-auto">
          <Link href="/reviews" className="text-orange-800 hover:underline">
            Reviews
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-orange-800 hover:underline">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
