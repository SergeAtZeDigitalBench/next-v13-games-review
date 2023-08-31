"use client";

import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

const copyToClipboard = () => {
  if (typeof window === "undefined") {
    return;
  }

  return navigator.clipboard.writeText(window.location.href);
};

interface IProps {
  [x: string]: unknown;
}

const ShareLink = ({}: IProps): JSX.Element => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClick = async () => {
    await copyToClipboard();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-1 items-center px-2 py-1 rounded border text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {isCopied ? "Link copied!" : "Share link"}
    </button>
  );
};

export default ShareLink;
