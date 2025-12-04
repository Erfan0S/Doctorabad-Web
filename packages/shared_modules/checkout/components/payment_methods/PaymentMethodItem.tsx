import Image from "next/image";
import { PaymentMethodType } from "../../types/cart";
import { InfoIcon } from "../../../assets";
import style from "./paymentMethods.module.scss";
import { Loading } from "../../../common/components";

type Props = {
  payemtMethod: PaymentMethodType;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

function PaymentMethodItem({
  payemtMethod,
  active,
  disabled,
  onClick,
  isLoading,
}: Props) {
  const className = disabled
    ? style.paymentMethodItem_disabled
    : active
      ? style.paymentMethodItem_active
      : "";

  return (
    <div
      className={`${style.paymentMethodItem} ${className}`}
      onClick={() => !disabled && onClick && onClick()}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {payemtMethod.icon ? (
            payemtMethod.icon
          ) : (
            <Image
              src={payemtMethod.pic_url || ""}
              alt={payemtMethod.title}
              width={50}
              height={50}
            />
          )}
          <div className={style.infoWrapper}>
            <span>{payemtMethod.title}</span>
            <span>{payemtMethod.description}</span>
          </div>
          {!!payemtMethod.more_info_url && (
            <a href={payemtMethod.more_info_url} target="_blank">
              <InfoIcon className={style.moreInfo} />
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default PaymentMethodItem;
