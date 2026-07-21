"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "../../../common/components";
import UserRankDetail from "./userRankDetail";
import RankingListItem from "./rankingListItem";

const SidePanelClubRanking: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["rankingList"],
    queryFn: () => api.getRankingList(),
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
  });

  if (isLoading) return <Loading size={24} />;

  if (!data?.data) return null;

  return (
    <div className="h-full overflow-y-auto">
      <UserRankDetail detail={data.data.user_rank} user={userData?.data.data} />
      <div className="px-4 pb-5">
        {data.data.data.map((user, index) => (
          <RankingListItem key={user.id} user={user} rank={index + 1} />
        ))}
      </div>{" "}
    </div>
  );
};

export default SidePanelClubRanking;
