import DownArrow from "@/assets/svg/downArrow";
import styles from "../BuyInsurancePage.module.scss";

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
  <div className={styles.clinicSection}>
    <div className={styles.geoRow}>
      <div className={styles.selectBox} onClick={onProvinceClick}>
        {provinceLabel} <DownArrow />
      </div>
      <div className={styles.selectBox} onClick={onCityClick}>
        {cityLabel} <DownArrow />
      </div>
    </div>

    <input
      className={styles.addressInput}
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
