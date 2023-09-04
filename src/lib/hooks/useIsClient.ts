import { useState, useEffect } from "react";

export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
