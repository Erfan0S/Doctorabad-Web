import React from "react";
import { StaticImageData } from "next/image";

const cardCls =
  "relative box-border flex h-[250px] w-full min-w-0 max-w-full flex-row-reverse items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#f5f5f5] p-2 text-[#141F23] no-underline transition-transform duration-200 [flex:1_1_calc(33.333%_-_20px)] hover:-translate-y-[2px] max-[992px]:h-[220px] max-[992px]:[flex:1_1_calc(50%_-_16px)] max-[768px]:aspect-square max-[768px]:h-auto max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:p-3 max-[768px]:[flex:1_1_100%] max-[576px]:p-2";

export interface ServiceCardProps {
  title: string;
  enTitle: string;
  icon: StaticImageData;
  href: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  enTitle,
  icon,
  href,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;
    event.preventDefault();
    onClick();
  };

  return (
    <a href={href} onClick={handleClick} className={cardCls}>
      <img
        src={icon.src}
        alt={title}
        className="h-[150px] w-[150px] max-w-[45%] flex-shrink-0 object-contain p-[15px] max-[992px]:h-[120px] max-[992px]:w-[120px] max-[992px]:p-0 max-[768px]:h-[100px] max-[768px]:w-[100px] max-[768px]:max-w-full max-[576px]:h-[60px] max-[576px]:w-[60px]"
      />
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[2px] px-[6px] py-2 text-center max-[768px]:w-full max-[768px]:p-0 max-[768px]:pt-1">
        <span className="w-full break-words text-[1.8rem] font-bold leading-[1.3] [overflow-wrap:anywhere] max-[992px]:text-[1.4rem] max-[768px]:text-[1.25rem] max-[576px]:text-[1.1rem]">{title}</span>
        {/* <span>{enTitle}</span> */}
      </div>
    </a>
  );
};

export default ServiceCard;
