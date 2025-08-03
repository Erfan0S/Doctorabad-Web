import {SidePanelPage, SidePanelPageProps} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import {isUserLoggedIn} from "@repo/core/utils/authUtils";
import {modalActions} from "@repo/core/modal/modals";

const SidePanelSupport: React.FC<SidePanelPageProps> = ({setPage}) => {
  const onBack = () => {
    if (isUserLoggedIn()) {
      setPage(SidePanelPage.MAIN);
    } else {
      modalActions.removeLastModal();
    }
  };

  return (
    <>
      <SidePanelHeader onBack={onBack} title="پشتیبانی" />
      <iframe
        style={{height: window.innerHeight - 61 + "px", width: "100%"}}
        src={"https://www.goftino.com/c/cskpcR"}
      />
    </>
  );
};

export default SidePanelSupport;
