"use client";
import { useState } from "react";
import { ModalProps } from "@repo/core/types/modals";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import { sidePanelPageList } from "./pageList";
import { motion } from "framer-motion";
import { slideLeftAnimation } from "@repo/core/constants/animationConfigs";

type Props = ModalProps<{
  initialPage?: SidePanelPage;
  data?: Record<string, any>;
}>;

export const SidePanel = ({ data = {}, closeModal }: Props) => {
  const [page, setPage] = useState(data.initialPage || SidePanelPage.MAIN);

  const Page = sidePanelPageList[page];

  return (
    <motion.div {...slideLeftAnimation} className="fixed top-0 end-0 flex h-screen w-full flex-col overflow-hidden bg-white sm:w-[400px]">
      <Page setPage={setPage} data={data.data} />
    </motion.div>
  );
};
