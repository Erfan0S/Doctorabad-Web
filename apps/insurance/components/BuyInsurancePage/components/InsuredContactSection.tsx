interface InsuredContactSectionProps {
  insuredName: string;
  insuredPhone: string;
  onInsuredNameChange: (value: string) => void;
  onInsuredPhoneChange: (value: string) => void;
}

const insuredInputCls =
  "min-h-[80px] w-full resize-y rounded-lg border border-solid border-[#ddd] p-[10px] text-[13px] [font-family:inherit]";

export const InsuredContactSection = ({
  insuredName,
  insuredPhone,
  onInsuredNameChange,
  onInsuredPhoneChange,
}: InsuredContactSectionProps) => (
  <div className="mt-4">
    <input
      className={insuredInputCls}
      type="text"
      placeholder="نام و نام خانوادگی بیمه‌گذار"
      value={insuredName}
      onChange={(e) => onInsuredNameChange(e.target.value)}
      style={{ minHeight: "auto", height: "auto", marginBottom: 12 }}
    />
    <input
      className={insuredInputCls}
      type="tel"
      placeholder="شماره موبایل بیمه‌گذار"
      value={insuredPhone}
      onChange={(e) => onInsuredPhoneChange(e.target.value)}
      style={{ minHeight: "auto", height: "auto" }}
    />
  </div>
);
