"use client";
import {useState} from "react";
import {ModalProps} from "@repo/core/types/modals";
import {SidePanelPage} from "@repo/core/types/sidePanel";
import {sidePanelPageList} from "./pageList";
import {motion} from "framer-motion";
import styles from "./sidePanel.module.scss";
import {slideLeftAnimation} from "@repo/core/constants/animationConfigs";
import {api} from "../api/Api";

type Props = ModalProps<{
  initialPage?: SidePanelPage;
  data?: Record<string, any>;
}>;

export const SidePanel = ({data = {}, closeModal}: Props) => {
  const [page, setPage] = useState(data.initialPage || SidePanelPage.MAIN);

  const Page = sidePanelPageList[page];

  // api.getShopOrdersList(1).then((res) => console.log(res));
  // api.getPreviousOrderDetail("DR130722").then((res) => console.log(res));

  return (
    <motion.div {...slideLeftAnimation} className={styles.sidePanel}>
      <Page setPage={setPage} data={data.data} />
    </motion.div>
  );
};
