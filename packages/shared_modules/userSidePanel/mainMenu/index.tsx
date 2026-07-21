import { SidePanelPage, SidePanelPageProps } from "@repo/core/types/sidePanel";
import { sidePanelMenuData } from "./menu-data";
import Image from "next/image";
// @ts-ignore
import footerImage from "../../assets/img/DA-Success.png";
import footerImageOpen from "../../assets/img/DA-Open.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import SidePanelHeader from "../header";
// @ts-ignore
import avatarImage from "../../assets/img/avatars/01.png";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { Loading } from "@repo/shared_modules/components";
import { ModalTypes } from "../../common/modal/modalsTypes";
import { useState } from "react";

const SidePanelMainMenu: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getUser,
    staleTime: Infinity,
  });

  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    retry: 1,
  });

  const [imageSrc, setImageSrc] = useState(footerImage);
  const toggleImageSrc = () => {
    if (imageSrc == footerImage) {
      setImageSrc(footerImageOpen);
    } else setImageSrc(footerImage);
  };

  if (isLoading)
    return (
      <div style= {{display: "flex", height: "100vh", alignItems: "center" }}>
        <Loading size={32} />
      </div>
    );

  const userInfo = profile?.data.data;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SidePanelHeader setPage={setPage} title="کلبه من" />

      <div
        className="relative flex flex-none items-center bg-white px-3 py-4 before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-1/2 before:bg-green-base before:content-['']"
        onClick={() => setPage(SidePanelPage.PROFILE)}
      >
        <div className="relative z-[2] flex h-[90px] w-[90px] flex-[0_0_90px] items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-white bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)]">
          <Image
            src={userInfo?.avatar || avatarImage}
            alt="clubImage"
            width={90}
            height={90}
            className="max-h-full max-w-full rounded-2xl"
          />
        </div>
        <div className="relative z-[2] flex flex-[0_0_calc(100%-90px)] flex-col overflow-hidden ps-3">
          <span className="mb-1 text-[20px] font-extrabold leading-[30px] text-white">
            {userInfo?.name || userInfo?.nickname || userInfo?.mobile}
          </span>
          <span className="text-[16px] font-bold leading-[30px] text-green-base">کیف‌پول‌من : {priceFormatter(userInfo?.credit || 0)}تومن!</span>
        </div>
      </div>

      {/* ناحیه‌ی اسکرول‌شونده: لیست + فوتر */}
      <div className="min-h-0 flex-auto overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-black/20">
        <div className="mb-3 flex flex-col px-4 py-2">
          {sidePanelMenuData.map(({ id, href, Icon, title, action }) => {
            const notifications = id === 6 &&
              isSuccess &&
              data.data.data.counter > 0 && (
                <span className="absolute -end-[6px] -top-[6px] z-10 flex h-5 w-5 items-center justify-center rounded-full border border-solid border-white bg-[#ff0307] pt-[3px] text-[10px] !text-white shadow-[0_0_3px_rgb(0_0_0_/_90%)]">
                  {data.data.data.counter}
                </span>
              );
            return (
              <div
                key={id}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-3 transition-[transform,box-shadow] duration-150 ease-[ease] hover:-translate-x-[3px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                onClick={() =>
                  action
                    ? action()
                    : modalActions.addModal(ModalTypes.SIDE_PANEL, {
                        initialPage: href,
                      })
                }
              >
                {/* سمت راست: آیکون + عنوان */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-green-base/[0.12] text-green-base [&_img]:h-6 [&_img]:w-6 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:fill-green-base [&_svg]:text-green-base [&_svg_path]:fill-green-base">
                    <Icon />
                    {notifications}
                  </span>
                  <span className="text-[15px] font-semibold">
                    {title}
                  </span>
                </div>

                {/* سمت چپ: فلش جهت */}
                <span className="flex items-center text-[#b9b9b9]">
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1L2 8L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>

        <div className="[&_img]:h-auto [&_img]:max-w-full">
          <Image onClick={toggleImageSrc} src={imageSrc} alt="footerImage" />
        </div>
      </div>
    </div>
  );
};

export default SidePanelMainMenu;