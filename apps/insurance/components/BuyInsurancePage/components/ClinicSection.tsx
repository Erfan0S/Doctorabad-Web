import styles from "../BuyInsurancePage.module.scss";

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
  <div className={styles.clinicSection}>
    <div className={styles.switchRow}>
      <span>مطب فعال دارم.</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={activeClinic}
          onChange={(e) => onActiveClinicChange(e.target.checked)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>

    {activeClinic && (
      <textarea
        className={styles.addressInput}
        placeholder="کلیه مراکز بهداشتی و درمانی مجاز سراسر کشور"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />
    )}
  </div>
);
