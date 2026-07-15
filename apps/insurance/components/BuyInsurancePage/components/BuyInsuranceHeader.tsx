interface BuyInsuranceHeaderProps {
  title: string;
  logo: string | null;
}

export const BuyInsuranceHeader = ({ title, logo }: BuyInsuranceHeaderProps) => (
  <div className="relative bg-green-base pt-4 [--img-size:6.7rem] [--img-offset-right:10px]">
    <div className="relative flex min-h-[3rem] items-end justify-end bg-green-base pl-5 pr-[calc(var(--img-size)+var(--img-offset-right)+10px)] text-left text-[1rem] font-bold text-white [direction:ltr]">
      {title}
      {logo && <img src={logo} alt={title} className="absolute bottom-[calc(var(--img-size)/-2)] right-[var(--img-offset-right)] h-[var(--img-size)] w-[var(--img-size)] rounded-[23px] border-4 border-solid border-white bg-white object-contain shadow-[0_4px_12px_rgba(0,0,0,0.15)]" />}
    </div>
    <div className="flex min-h-[3rem] justify-start bg-white pl-5 pr-[calc(var(--img-size)+var(--img-offset-right)+10px)] text-right text-[0.9rem] font-bold text-green-base">{title}</div>
  </div>
);
