"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { SearchBar as SharedSearchBar } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  haveFilterButton?: boolean;
};

const SearchBar = ({ haveFilterButton }: Props) => {
  const { data } = useQuery({
    queryKey: ["packages_count"],
    queryFn: () => api.getPackages(1, "newest", 0),
  });

  const packagesCount = data?.data.meta.total || 0;
  // اگه فیلدت count بود:
  // const packagesCount = data?.data.data.count || 0;

  return (
    <div>

    <SharedSearchBar
      app={Apps.DOWNLOAD}
      haveFilterButton={haveFilterButton}
      placeholder={`در میان ${packagesCount} پکیج جست‌وجو کن!`}
      />
      </div>
  );
};

export default SearchBar;
