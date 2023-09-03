"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface IProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({
  children,
  className = "",
  ...restLinkProps
}: IProps): JSX.Element => {
  const pathname = usePathname();
  const isCurrent = pathname === restLinkProps.href;

  return isCurrent ? (
    <span className={`text-orange-800 ${className}`}>{children}</span>
  ) : (
    <Link
      {...restLinkProps}
      className={`text-orange-800 hover:underline ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
