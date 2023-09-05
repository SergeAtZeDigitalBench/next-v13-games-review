import { NextRequest, NextResponse } from "next/server";

import { getSearchableReviews } from "@/lib/serverOnly";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return new Response(null, {
      status: 401,
      statusText: "query param is missing",
    });
  }

  const [res, err] = await getSearchableReviews(query);

  if (!!err) {
    return new Response(null, {
      status: 500,
      statusText: err,
    });
  }

  return NextResponse.json(res);
};
