// app/clinic/page.tsx
"use client";

import { useState } from "react";
// import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import styles from "./page.module.scss";
// import { HeaderType } from "@/types/insurance";
import SelectInfo from "@/components/SelectInfo/SelectInfo";
import InsurerListSection from "@/components/InsurerList/InsurerListSection";


export default function InsuranceHomePage() {
  const [fields, setFields] = useState<number[]>([]);
  const [grades, setGrades] = useState<number[]>([]);
  const [residency, setResidency] = useState<number | null>(null);
  const [damageHistory, setDamageHistory] = useState<number | null>(null);
  const [lastInsurance, setLastInsurance] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);



  return (
    <div className={styles.container}>
      {/* <ClinicHeader headerPageType={HeaderType.OTHERS} title="کلینیک من" /> */}
      <SelectInfo
        onChangeFields={setFields}
        onChangeGrades={setGrades}
        onChangeResidency={setResidency}
        onChangeDamageHistory={setDamageHistory}
        onChangeLastInsurance={setLastInsurance}
        onChangeEndDate={setEndDate}
      />

      <InsurerListSection
        selectedFieldIds={fields}
        selectedGradeIds={grades}
        residencyStatusId={residency}
        damageHistoryId={damageHistory}
        lastInsuranceId={lastInsurance}
        currentInsuranceEndDate={endDate}
      />
    </div>
  );
}