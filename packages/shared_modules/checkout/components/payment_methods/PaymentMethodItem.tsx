import Image from "next/image";
import { PaymentMethodType } from "../../types/cart";
import { InfoIcon } from "../../../assets";
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
  // SCSS→Tailwind: was paymentMethodItem_disabled / paymentMethodItem_active
  const stateClassName = disabled
    ? "cursor-not-allowed border-gray-light bg-gray-light"
    : active
      ? "cursor-pointer border-app-base"
      : "cursor-pointer border-gray-light";

  return (
    <div
      className={`relative flex min-h-[70px] flex-row items-center gap-4 rounded-[10px] border-2 border-solid p-2 [&>svg]:h-10 [&>svg]:w-10 max-[425px]:[&>svg]:h-8 max-[425px]:[&>svg]:w-8 ${stateClassName}`}
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
              className="h-10 w-10 rounded-[14px] bg-gray-light max-[425px]:h-8 max-[425px]:w-8 max-[425px]:rounded-[10px]"
            />
          )}
          <div className="flex flex-1 flex-col text-[length:small]">
            <span className="pe-5 font-semibold">{payemtMethod.title}</span>
            <span className="whitespace-break-spaces text-[12px] text-gray">
              {payemtMethod.description}
            </span>
          </div>
          {!!payemtMethod.more_info_url && (
            <a href={payemtMethod.more_info_url} target="_blank">
              <InfoIcon
                className={`absolute left-[5px] top-[5px] ${
                  disabled ? "text-[#5a5a5a]" : "text-gray"
                }`}
              />
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default PaymentMethodItem;
