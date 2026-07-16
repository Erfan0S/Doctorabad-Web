import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import DiscountPlans from "@/components/discountPlans";

type Props = ModalProps<{}>;

function DiscountPlansBuyModal({ closeModal }: Props) {
  return (
    <ModalWrapper closeModal={closeModal} app={Apps.EXAM}>
      <div className="flex flex-col gap-[10px] max-h-[75vh] overflow-y-auto p-[10px] [&_h4]:text-center [&_h4]:font-semibold [&_h4]:text-[14px]">
        <h4>
          برای دسترسی به ((پاسخ تشریحی)) سوالات و ((تک آزمون‌ها)) یکی از طرح‌های
          زیر را انتخاب کن!
        </h4>
        <div>
          <h4>طرح‌های عادی: دسترسی به پاسخ تشریحی آزمون‌های داخلی</h4>
          <h4>
            طرح‌های vip: دسترسی به پاسخ تشریحی آزمون‌های داخلی و بین‌المللی
          </h4>
        </div>
        <DiscountPlans haveUserPlan={false} />
      </div>
    </ModalWrapper>
  );
}

export default DiscountPlansBuyModal;
