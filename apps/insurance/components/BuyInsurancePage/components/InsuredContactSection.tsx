import styles from "../BuyInsurancePage.module.scss";

interface InsuredContactSectionProps {
  insuredName: string;
  insuredPhone: string;
  onInsuredNameChange: (value: string) => void;
  onInsuredPhoneChange: (value: string) => void;
}

export const InsuredContactSection = ({
  insuredName,
  insuredPhone,
  onInsuredNameChange,
  onInsuredPhoneChange,
}: InsuredContactSectionProps) => (
  <div className={styles.clinicSection}>
    <input
      className={styles.addressInput}
      type="text"
      placeholder="نام و نام خانوادگی بیمه‌گذار"
      value={insuredName}
      onChange={(e) => onInsuredNameChange(e.target.value)}
      style={{ minHeight: "auto", height: "auto", marginBottom: 12 }}
    />
    <input
      className={styles.addressInput}
      type="tel"
      placeholder="شماره موبایل بیمه‌گذار"
      value={insuredPhone}
      onChange={(e) => onInsuredPhoneChange(e.target.value)}
      style={{ minHeight: "auto", height: "auto" }}
    />
  </div>
);
