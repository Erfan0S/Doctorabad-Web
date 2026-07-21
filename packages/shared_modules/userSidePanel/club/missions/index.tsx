"use client";
import React from "react";
import MissionsItem from "./MissionsItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "../../../common/components";
import { toast } from "react-toastify";

export default function Missions() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clubMissions"],
    queryFn: () => api.getClubMissionsList().then((res) => res.data.data),
  });

  const { mutateAsync: exploreMission, isPending } = useMutation({
    mutationFn: () => api.clubMissionExplore(),
    onSuccess: () => {
      toast.success("ماموریت با موفقیت انجام شد");
    },
  });

  if (isLoading) return <Loading size={25} />;

  if (!data) return <span>هیج ماموریتی پیدا نشد!</span>;

  const missions = data.map((m) => {
    if (m.id != 1) return m;

    return {
      ...m,
      onClick: (
        isActive: boolean,
        setActive: (active: boolean) => void,
        setLoading: (loading: boolean) => void,
      ) => {
        if (!isActive || isPending) return;
        setLoading(true);
        exploreMission()
          .then(() => {
            setActive(false);
          })
          .finally(() => {
            refetch();
            setLoading(false);
          });
      },
      button_text: "دریافت هدیه روزانه",
    };
  });

  return (
    <div className="px-3 py-4">
      {missions.map((m, i) => (
        <MissionsItem mission={m} key={i} />
      ))}
    </div>
  );
}
