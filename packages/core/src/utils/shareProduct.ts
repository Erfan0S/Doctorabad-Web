import { copyText } from "./copyText";

export const shareProduct = async (
  shareInfo: () => Promise<{
    title?: string;
    description?: string;
    url: string | null;
  }>
) => {
  const res = await shareInfo();
  const url = res.url ? res.url : window.location.toString();

  copyText(`${res.description} \n ${url}`, "متن اشتراک گذاری کپی شد");
};
