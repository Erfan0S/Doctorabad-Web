"use client";
import React, { useEffect } from "react";
import styles from "./Watermark.module.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";

type Props = {
  active?: boolean;
  shown?: boolean;
};

export default function Watermark({ active, shown }: Props) {
  const [position, setPosition] = React.useState([50, 50]);
  let interval: ReturnType<typeof setInterval>;

  const createRandomPosition = () => {
    return Math.round(Math.random() * (80 - 30 + 30) + 10);
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
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  if (!shown || !active) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <span
        className={styles.watermark}
        style={{ left: `${position[0]}%`, top: `${position[1]}%` }}
      >
        {data?.data.data.mobile || "سرزمین علوم پزشکی دکترآباد"}
      </span>
    </div>
  );
}
