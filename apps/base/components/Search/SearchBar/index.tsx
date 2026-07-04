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
    queryKey: ["search_count"],
    queryFn: () => api.getLessonsCount(),
  });

  return (
    <SharedSearchBar
      app={Apps.BASE}
      haveFilterButton={haveFilterButton}
      placeholder={`در مباحث ${data?.data.data || 10000} درس جست و جو کن!`}
    />
  );
};

export default SearchBar;
