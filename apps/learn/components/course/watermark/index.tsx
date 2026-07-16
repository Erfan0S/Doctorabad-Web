"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

type Props = {
  active?: boolean;
  shown?: boolean;
};

export default function Watermark({ active, shown }: Props) {
  if (!isUserLoggedIn()) {
    return null;
  }

  const [position, setPosition] = React.useState([50, 50]);
  let interval: ReturnType<typeof setInterval>;

  const createRandomPosition = () => {
    return Math.round(Math.random() * 55 + 10);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["watermark-user"],
    queryFn: api.getUser,
  });

  useEffect(() => {
    if (!active) {
      clearInterval(interval);
      return;
    }
    interval = setInterval(() => {
      setPosition([createRandomPosition(), createRandomPosition()]);
    }, 10000);
    return () => clearInterval(interval);
  }, [active]);

  if (!shown || !active) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18px] text-[rgb(0,212,0)] opacity-70 transition-all duration-[1500ms]"
        style={{ left: `${position[0]}%`, top: `${position[1]}%` }}
      >
        {data?.data.data.mobile || "سرزمین علوم پزشکی دکترآباد"}
      </span>
    </div>
  );
}
