interface ClinicSectionProps {
  activeClinic: boolean;
  address: string;
  onActiveClinicChange: (active: boolean) => void;
  onAddressChange: (address: string) => void;
}

export const ClinicSection = ({
  activeClinic,
  address,
  onActiveClinicChange,
  onAddressChange,
}: ClinicSectionProps) => (
  <div className="mt-4">
    <div className="mb-3 flex items-center justify-between text-sm font-bold">
      <span>مطب فعال دارم.</span>
      <label className="relative inline-block h-6 w-11">
        <input
          className="peer h-0 w-0 opacity-0"
          type="checkbox"
          checked={activeClinic}
          onChange={(e) => onActiveClinicChange(e.target.checked)}
        />
        <span className="absolute inset-0 cursor-pointer rounded-[34px] bg-[#ccc] transition-all duration-[400ms] before:absolute before:bottom-[3px] before:left-[3px] before:h-[18px] before:w-[18px] before:rounded-full before:bg-white before:transition-all before:duration-[400ms] before:content-[''] peer-checked:bg-[#2ecc71] peer-checked:before:translate-x-5 peer-focus:shadow-[0_0_1px_#2ecc71]"></span>
      </label>
    </div>

    {activeClinic && (
      <textarea
        className="min-h-[80px] w-full resize-y rounded-lg border border-solid border-[#ddd] p-[10px] text-[13px] [font-family:inherit]"
        placeholder="کلیه مراکز بهداشتی و درمانی مجاز سراسر کشور"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />
    )}
  </div>
);
