import { SearchParamsUtils } from "../utils/UrlUtils";
import { useRouter, useSearchParams } from "next/navigation";

export const useChangeSearchParamsFilter = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  return (data: { [key: string]: string | null }, scroll: boolean = false) => {
    push(
      SearchParamsUtils.paramsStringify(data, {
        questionMarkPrefix: true,
        appendPrevSearchParams: true,
        customPrevSearchParam: searchParams?.toString(),
      }),
      { scroll }
    );
  };
};
