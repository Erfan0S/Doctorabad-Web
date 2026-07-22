import React from "react";
import { ModalWrapper } from "../../../common/components";

const VpnWarning: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="flex items-center justify-center animate-[fadeIn_0.3s_ease-in-out]">
      <ModalWrapper
        closeModal={closeModal}
        haveAppIcon={false}
        className="bg-white rounded-[16px] pt-[32px] px-[24px] pb-[30px] max-w-[420px] min-h-[auto] w-[90%] shadow-[0_10px_40px_rgba(0,0,0,0.15)] animate-[slideUp_0.3s_ease-out] text-center [direction:rtl] [&_button]:bg-[#ff9800] max-md:py-[24px] max-md:px-[20px] max-md:max-w-[340px]"
      >
        <div className="mb-[20px] flex justify-center">
          <svg
            className="w-[56px] h-[56px] text-[#ff9800] drop-shadow-[0_2px_8px_rgba(255,152,0,0.3)] max-md:w-[48px] max-md:h-[48px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-[16px] leading-[1.8] text-[#333333] m-0 font-medium text-center max-md:text-[15px]">
          اگر از VPN استفاده می‌کنید، پیشنهاد می‌شود برای تجربه کاربری بهتر آن
          را خاموش کنید!
        </p>
      </ModalWrapper>
    </div>
  );
};

export default VpnWarning;
