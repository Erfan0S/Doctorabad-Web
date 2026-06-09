"use client";

import { baseUrls, routePath } from "@repo/core/constants/routePath";
import styles from "./ProTag.module.scss";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";

type Props = {
  active?: boolean;
};

const ProTag = ({ active = false }: Props) => {
  return (
    <div
      className={`${styles.proTag} ${active ? styles.active : styles.inactive}`}
      onClick={authorizeClientAction(() => {
        window.open(`${baseUrls[Apps.BASE]}${routePath.pro}`, "_self");
      })}
    >
      <span>Pro</span>
    </div>
  );
};

export default ProTag;
