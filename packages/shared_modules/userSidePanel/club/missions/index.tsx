"use client";
import React from "react";
import MissionsItem from "./MissionsItem";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "../../../common/components";

export default function Missions() {
  const { data, isLoading } = useQuery({
    queryKey: ["clubMissions"],
    queryFn: () => api.getClubMissionsList().then((res) => res.data.data),
  });

  if (isLoading) return <Loading size={25} />;

  console.log(data);

  if (!data) return <span>هیج ماموریتی پیدا نشد!</span>;

  return (
    <div>
      {data.map((m, i) => (
        <MissionsItem mission={m} key={i} />
      ))}
    </div>
  );
}
