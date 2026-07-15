interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center gap-[6px] text-[13px] font-semibold text-[#444]">
    <span className="text-[18px] leading-[0] text-green-base">•</span> {label}: {value}
  </div>
);
