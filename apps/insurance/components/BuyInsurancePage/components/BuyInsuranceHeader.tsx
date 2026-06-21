import styles from "../BuyInsurancePage.module.scss";

interface BuyInsuranceHeaderProps {
  title: string;
  logo: string | null;
}

export const BuyInsuranceHeader = ({ title, logo }: BuyInsuranceHeaderProps) => (
  <div className={styles.header}>
    <div className={styles.top}>
      {title}
      {logo && <img src={logo} alt={title} className={styles.image} />}
    </div>
    <div className={styles.bottom}>{title}</div>
  </div>
);
