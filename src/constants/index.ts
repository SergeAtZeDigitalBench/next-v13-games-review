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
