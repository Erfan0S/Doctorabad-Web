import DownArrow from "@/assets/svg/downArrow";

const selectBoxCls =
  "flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-solid border-[#ddd] bg-white p-[10px] text-[13px]";

interface LocationSectionProps {
  provinceLabel: string;
  cityLabel: string;
  postalCode: number | undefined;
  onProvinceClick: () => void;
  onCityClick: () => void;
  onPostalCodeChange: (value: number | undefined) => void;
}

export const LocationSection = ({
  provinceLabel,
  cityLabel,
  postalCode,
  onProvinceClick,
  onCityClick,
  onPostalCodeChange,
}: LocationSectionProps) => (
  <div className="mt-4">
    <div className="mb-3 flex items-center gap-3">
      <div className={selectBoxCls} onClick={onProvinceClick}>
        {provinceLabel} <DownArrow />
      </div>
      <div className={selectBoxCls} onClick={onCityClick}>
        {cityLabel} <DownArrow />
      </div>
    </div>

    <input
      className="min-h-[80px] w-full resize-y rounded-lg border border-solid border-[#ddd] p-[10px] text-[13px] [font-family:inherit]"
      type="text"
      placeholder="کد پستی (ثبت شده در amlak.mrud.ir)"
      value={postalCode ? String(postalCode) : ""}
      onChange={(e) =>
        onPostalCodeChange(Number(e.target.value) || undefined)
      }
      style={{ minHeight: "auto", height: "auto" }}
    />
  </div>
);
