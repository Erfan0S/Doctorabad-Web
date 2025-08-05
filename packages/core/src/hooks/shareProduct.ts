import { useCallback, useState } from "react";
import { copyText } from "../utils/copyText";
import { s } from "framer-motion/client";

export const useShareProduct = (
  shareInfo: () => Promise<{
    title?: string;
    description?: string;
    url: string | null;
  }>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const shareProduct = useCallback(() => {
    setIsLoading(true);
    shareInfo()
      .then((res) => {
        const url = res.url ? res.url : window.location.toString();
        copyText(`${res.description} \n ${url}`, "متن اشتراک گذاری کپی شد");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [shareInfo]);

  return {
    shareProduct,
    isLoading,
  };
};
