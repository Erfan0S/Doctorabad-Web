import styles from "../BuyInsurancePage.module.scss";
import { InfoRow } from "./InfoRow";

interface UserInfoListProps {
  insuredName: string;
  insuredPhone: string;
  displayFieldTitle: string;
  displayGradeTitle: string;
  residencyLabel: string;
  damageHistoryLabel: string;
  showPreviousInsuranceFields: boolean;
  lastInsuranceLabel: string;
  endDateLabel: string;
}

export const UserInfoList = ({
  insuredName,
  insuredPhone,
  displayFieldTitle,
  displayGradeTitle,
  residencyLabel,
  damageHistoryLabel,
  showPreviousInsuranceFields,
  lastInsuranceLabel,
  endDateLabel,
}: UserInfoListProps) => (
  <div className={styles.infoList}>
    <InfoRow label="نام بیمه‌گذار" value={insuredName} />
    <InfoRow label="شماره موبایل" value={insuredPhone} />

    <InfoRow label="رشته" value={displayFieldTitle} />
    <InfoRow label="تخصص" value={displayGradeTitle} />
    <InfoRow label="وضعیت" value={residencyLabel} />
    <InfoRow label="سابقه خسارت" value={damageHistoryLabel} />

    {showPreviousInsuranceFields && (
      <>
        <InfoRow label="بیمه‌گر قبلی" value={lastInsuranceLabel} />
        <InfoRow label="اتمام بیمه‌نامه" value={endDateLabel} />
      </>
    )}
  </div>
);
