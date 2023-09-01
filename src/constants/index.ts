const getEnvVar = (varname: string) => {
  try {
    const value = process.env[varname];
    if (!value) {
      throw new Error(
        `Env variable ${varname} not found. Make sure you have set it.`,
      );
    }

    return value;
  } catch (error) {
    throw new Error(
      `Env variable ${varname} not found. Make sure you have set it.`,
    );
  }
};

export const RAWG_API_KEY = getEnvVar("RAWG_API_KEY");

export const CMS_BASE_URL = getEnvVar("CMS_BASE_URL");

export const CMS_SECRET = getEnvVar("CMS_SECRET");

export const DELAY_SEC = {
  SEC_30: 30,
  MIN_1: 60,
  MIN_10: 600,
  MIN_15: 900,
  HOUR_1: 1200,
} as const;

export const CACHE_TAG = {
  REVIEW_DETAILS: "review-details",
  REVIEWS_LIST: "reviews-list",
} as const;
