import { SearchParamsUtils } from "@repo/core/utils/urlutils";
import { useRouter, useSearchParams } from "next/navigation";

export const useChangeSearchParamsFilter = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  return (data: { [key: string]: string | null }) => {
    push(
      SearchParamsUtils.paramsStringify(data, {
        questionMarkPrefix: true,
        appendPrevSearchParams: true,
        customPrevSearchParam: searchParams.toString(),
      }),
      { scroll: true }
    );
  };
};
