// app/clinic/page.tsx
"use client";

import { useState } from "react";
import InsuranceHeader from "@/components/InsuranceHeader/InsuranceHeader";
import styles from "./page.module.scss";
import { HeaderType } from "@/types/insurance";
import SelectInfo from "@/components/SelectInfo/SelectInfo";
import InsurerListSection from "@/components/InsurerList/InsurerListSection";
import {
  InsuranceField,
  InsuranceGrade,
  ResidencyStatus,
  DamageHistory,
  Insurer,
} from "@/types/insurance";

 
export default function InsuranceHomePage() {
  const [field, setField] = useState<number | null>(null);
  const [fieldsData, setFieldsData] = useState<InsuranceField | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [gradesData, setGradesData] = useState<InsuranceGrade | null>(null);
  const [residency, setResidency] = useState<number | null>(null);
  const [residencyData, setResidencyData] = useState<ResidencyStatus | null>(null);
  const [damageHistory, setDamageHistory] = useState<number | null>(null);
  const [damageHistoryData, setDamageHistoryData] = useState<DamageHistory | null>(null);
  const [lastInsurance, setLastInsurance] = useState<number | null>(null);
  const [lastInsuranceData, setLastInsuranceData] = useState<Insurer | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);



  return (
    <div className={styles.container}>
      <SelectInfo
        onChangeField={setField}
        onChangeFieldsData={setFieldsData}
        onChangeGrade={setGrade}
        onChangeGradesData={setGradesData}
        onChangeResidency={setResidency}
        onChangeResidencyData={setResidencyData}
        onChangeDamageHistory={setDamageHistory}
        onChangeDamageHistoryData={setDamageHistoryData}
        onChangeLastInsurance={setLastInsurance}
        onChangeLastInsuranceData={setLastInsuranceData}
        onChangeEndDate={setEndDate}
      />

      <InsurerListSection
        selectedFieldId={field}
        selectedGradeId={grade}
        residencyStatusId={residency}
        damageHistoryId={damageHistory}
        lastInsuranceId={lastInsurance}
        lastInsuranceTitle={lastInsuranceData?.title}
        currentInsuranceEndDate={endDate}
        // fieldData={fieldsData}
        // gradeData={gradesData}
        // residencyData={residencyData}
        // damageHistoryData={damageHistoryData}
        // lastInsuranceData={lastInsuranceData}
      />
    </div> 
  );
}