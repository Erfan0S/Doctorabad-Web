import React from "react";
import SidePanelHeader from "../../header";
import {SidePanelPageProps} from "@repo/core/types/sidePanel";

const PrevCards: React.FC<SidePanelPageProps> = ({setPage}) => {
  return (
    <>
      <SidePanelHeader title="سبدهای خرید من" setPage={setPage} />
    </>
  );
};

export default PrevCards;
