import { SidePanelPageProps } from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";

const SidePanelSupport: React.FC<SidePanelPageProps> = ({ setPage, data }) => {
  return (
    <>
      <SidePanelHeader title="پشتیبانی" />
      <iframe
        style={{ height: window.innerHeight - 61 + "px", width: "100%" }}
        src={"https://www.goftino.com/c/cskpcR"}
      />
    </>
  );
};

export default SidePanelSupport;
