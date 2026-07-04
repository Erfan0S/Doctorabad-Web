import styles from "../BuyInsurancePage.module.scss";

interface MobileConfirmationCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const MobileConfirmationCheckbox = ({
  checked,
  onChange,
}: MobileConfirmationCheckboxProps) => (
  <div className={styles.mobileCheckContainer}>
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <h3>شماره موبایل وارد شده به نام فرد بیمه‌گذار است.</h3>
  </div>
);
