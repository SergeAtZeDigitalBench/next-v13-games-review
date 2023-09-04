import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { getNextPage, getPageNumber, getPrevPage } from "@/lib";

interface IButonProps {
  href: string;
  isDisabled: boolean;
  children: React.ReactNode;
}
const PaginationButton = ({ href, isDisabled, children }: IButonProps) => {
  return (
    <Link
      href={href}
      className={`border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700 ${
        isDisabled
          ? "cursor-not-allowed text-slate-400 hover:bg-inherit hover:text-slate-400"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

interface IProps {
  href: string;
  page?: string;
  totalPages?: number;
  firstPage?: number;
}

const Pagination = ({
  href,
  page,
  totalPages = 100,
  firstPage = 1,
}: IProps) => {
  const currentPage = getPageNumber(page);
  const nextPageHref = `${href}?page=${getNextPage(currentPage, totalPages)}`;
  const prevPageHref =
    getPrevPage(currentPage, firstPage) !== firstPage
      ? `${href}?page=${getPrevPage(currentPage, firstPage)}`
      : href;

  return (
    <div className="flex items-center gap-2">
      <PaginationButton href={prevPageHref} isDisabled={currentPage === 1}>
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </PaginationButton>
      <span className=" min-w-[120px] text-center">
        Page {currentPage} out of {totalPages}
      </span>
      <PaginationButton
        href={nextPageHref}
        isDisabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </PaginationButton>
    </div>
  );
};

export default Pagination;
