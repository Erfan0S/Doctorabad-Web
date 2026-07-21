"use client";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import { Button } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
// @ts-ignore
import examIcon from "@repo/shared_modules/images/doctor-exam.png";
import { ExamOrderItem as ExamOrderItemType } from "../../types/orders";
import OrderMetaData from "../common/OrderMetaData";
import { useRouter } from "next/navigation";
import { baseUrls, examPaths } from "@repo/core/constants/routePath";

type Props = {
  item: ExamOrderItemType;
};

function ExamOrderItem({ item }: Props) {
  const router = useRouter();

  // TODO: need use const var instead of hardcodedurl

  return (
    <div className="card flex flex-row gap-[10px] border-[1.5px] border-solid border-gray-light p-[10px] !shadow-none [&>div]:flex [&>div:first-child]:items-center [&>div:last-child]:flex-1 [&>div:last-child]:flex-col [&>div:last-child]:justify-between [&>div:last-child]:gap-[5px] [&_button]:flex-none [&_button]:text-xs max-[768px]:[&_button]:text-[10px] [&_img]:aspect-square [&_img]:h-[100px] [&_img]:w-auto [&_img]:rounded-[15px]">
      <div>
        <Image
          src={item.pic_url || examIcon}
          alt={item.title}
          placeholder={placeHolderDataUrl}
          width={100}
          height={100}
          className={!item.pic_url ? "border border-solid border-gray-light bg-white p-3" : ""}
        />
      </div>
      <div>
        <h3>{item.title}</h3>
        <div className="flex flex-col gap-[3px] [&_span]:font-normal [&_span]:text-gray [&_h3]:text-[15px] [&_h3]:font-bold">
          <OrderMetaData order={item} />
        </div>
        <div className="flex flex-row-reverse justify-start gap-[10px] [&_button]:min-w-[80px] [&_button]:flex-none [&_button_a]:text-white">
          <Button
            onClick={() => {
              setTimeout(
                () =>
                  router.push(`${baseUrls.exam}${examPaths.single}/${item.id}`),
                100
              );
              modalActions.clearModals();
            }}
          >
            ورود
          </Button>
          <Button
            app={Apps.EXAM}
            onClick={() => {
              modalActions.addModal(ModalTypes.EXAM_START, { exam: item });
            }}
          >
            شروع آزمون
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExamOrderItem;
