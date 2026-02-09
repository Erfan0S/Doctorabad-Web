"use client";
import React from "react";
import MissionsItem from "./MissionsItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "../../../common/components";
import clubStyle from "../SidePanelClub.module.scss";
import { toast } from "react-toastify";

export default function Missions() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clubMissions"],
    queryFn: () => api.getClubMissionsList().then((res) => res.data.data),
  });

  const { mutateAsync: exploreMission } = useMutation({
    mutationFn: () => api.clubMissionExplore(),
    onSuccess: () => {
      toast.success("ماموریت با موفقیت انجام شد");
      refetch();
    },
  });

  if (isLoading) return <Loading size={25} />;

  if (!data) return <span>هیج ماموریتی پیدا نشد!</span>;

  const missions = data.map((m) => {
    if (m.id != 1) return m;

    return {
      ...m,
      onClick: (
        setActive: (active: boolean) => void,
        setLoading: (loading: boolean) => void,
      ) => {
        setLoading(true);
        exploreMission()
          .then(() => {
            setActive(false);
            refetch();
          })
          .finally(() => {
            setLoading(false);
          });
      },
      button_text: "دریافت هدیه روزانه",
    };
  });

  return (
    <div className={clubStyle.clubContainer}>
      {missions.map((m, i) => (
        <MissionsItem mission={m} key={i} />
      ))}
    </div>
  );
}
