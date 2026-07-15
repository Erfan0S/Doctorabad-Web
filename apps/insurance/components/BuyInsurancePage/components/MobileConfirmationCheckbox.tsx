interface MobileConfirmationCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const MobileConfirmationCheckbox = ({
  checked,
  onChange,
}: MobileConfirmationCheckboxProps) => (
  <div className="flex items-center justify-start gap-[10px]">
    <input
      className="relative mb-2 h-4 w-4 cursor-pointer appearance-none rounded border-2 border-solid border-[#ccc] bg-white checked:border-green-base checked:bg-green-base checked:after:absolute checked:after:left-1 checked:after:top-[2px] checked:after:h-2 checked:after:w-1 checked:after:rotate-45 checked:after:border-0 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-solid checked:after:border-white checked:after:content-['']"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <h3>شماره موبایل وارد شده به نام فرد بیمه‌گذار است.</h3>
  </div>
);
