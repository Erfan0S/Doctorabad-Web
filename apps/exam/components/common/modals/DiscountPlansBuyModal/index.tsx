import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import style from "./discountPlansBuy.module.scss";
import DiscountPlans from "@/components/discountPlans";

type Props = ModalProps<{}>;

function DiscountPlansBuyModal({ closeModal }: Props) {
  return (
    <ModalWrapper closeModal={closeModal} app={Apps.EXAM}>
      <div className={style.discountPlansBuyModal}>
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
