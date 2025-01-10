"use client";
import { useState } from "react";
import { ModalProps } from "../common/types/modals";
import { SidePanelPage } from "./types/sidePanel";
import { sidePanelPageList } from "./pageList";
import { motion } from "framer-motion";
import styles from "./sidePanel.module.scss";
import { slideLeftAnimation } from "../common/constants/animationConfigs";

type Props = ModalProps<{ initialPage?: SidePanelPage }>;

export const SidePanel = ({ data = {}, closeModal }: Props) => {
  const [page, setPage] = useState(data.initialPage || SidePanelPage.MAIN);

  const Page = sidePanelPageList[page];

  return (
    <motion.div {...slideLeftAnimation} className={styles.sidePanel}>
      <Page setPage={setPage} />
    </motion.div>
  );
};
