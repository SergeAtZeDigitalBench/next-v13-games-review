import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { IWhCmsReviewEvent } from "@/types";
import { CACHE_TAG } from "@/constants";

/**
 * @description see `readme.md` more about webhooks settings
 */
export const POST = async (request: NextRequest) => {
  const payload: IWhCmsReviewEvent = await request.json();

  /**
   * @description the headers "Authorization" is set on Strapi BE CMS Webhook setttings
   */
  const secret = request.headers.get("Authorization");

  if (
    secret !== process.env.NEXT_PUBLIC_CMS_SECRET ||
    payload.model !== "review"
  ) {
    return new Response(null, { status: 204 });
  }

  revalidateTag(CACHE_TAG.REVIEWS_LIST);
  revalidateTag(CACHE_TAG.REVIEW_DETAILS);

  return new Response(null, { status: 204 });
};
