import styles from "../BuyInsurancePage.module.scss";

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className={styles.infoRow}>
    <span className={styles.bullet}>•</span> {label}: {value}
  </div>
);
