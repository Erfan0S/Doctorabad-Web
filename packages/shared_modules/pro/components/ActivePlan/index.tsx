const ActivePlan = ({ data }: { data?: DrProActivePlan }) => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>وضعیت اشتراک</h2>
      <div className={(data?.left_days ?? 0) > 0 ? styles.activePlan : styles.noPlan}>{(data?.left_days ?? 0) > 0 ? `${data?.left_days} روز مانده` : "غیرفعال"}</div>
    </div>
  );
};

import { DrProActivePlan } from "@repo/core/types/dr-pro";
import styles from "./ActivePlan.module.scss";

export default ActivePlan;