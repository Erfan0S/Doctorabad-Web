import React from "react";
import { Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import CourseListItem from "../../common/lists/CourseList/CourseListItem";

const SidePanelFavoritesLearning: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => api.getLearnOrdersList(),
    queryKey: ["previousOrdersList"],
    staleTime: 0,
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <div>
      {data?.data?.data &&
        data?.data?.data?.map((item) => (
          <CourseListItem key={item.id} course={item} type="order" />
        ))}
    </div>
  );
};

export default SidePanelFavoritesLearning;
