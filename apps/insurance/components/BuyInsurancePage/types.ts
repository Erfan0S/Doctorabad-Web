export interface FilterData {
  id: number;
  title: string;
}

export interface BuyInsuranceUrlParams {
  insurerTitle: string;
  insurerLogo: string | null;
  insurerId: number | null;
  urlPrice: number;
  urlMainPrice: number;
  fieldId: number | null;
  gradeId: number | null;
  residencyId: number | null;
  damageHistoryId: number | null;
  lastInsuranceId: number | null;
  urlProvinceId: number | undefined;
  urlCityId: number | undefined;
  urlPostalCode: number | undefined;
  urlActiveClinic: boolean | undefined;
  urlClinicAddress: string | undefined;
  urlInsuredName: string;
  urlInsuredPhone: string;
  endDate: string;
  fieldData: FilterData | null;
  gradeData: FilterData | null;
  residencyData: FilterData | null;
  damageHistoryData: FilterData | null;
  lastInsuranceData: FilterData | null;
}
