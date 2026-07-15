"use client";

import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useBuyInsuranceParams, useEnsureInsuredParams } from "./hooks/useBuyInsuranceParams";
import { useBuyInsuranceForm } from "./hooks/useBuyInsuranceForm";
import { useDynamicInsurancePrice } from "./hooks/useDynamicInsurancePrice";
import { useBuyInsuranceActions } from "./hooks/useBuyInsuranceActions";
import { BuyInsuranceHeader } from "./components/BuyInsuranceHeader";
import { UserInfoList } from "./components/UserInfoList";
import { MobileConfirmationCheckbox } from "./components/MobileConfirmationCheckbox";
import { DocumentUploadSection } from "./components/DocumentUploadSection";
import { LocationSection } from "./components/LocationSection";
import { ClinicSection } from "./components/ClinicSection";
import { BuyInsuranceFooter } from "./components/BuyInsuranceFooter";
import { ToastContainer } from "react-toastify";

const BuyInsurancePage = () => {
  const urlParams = useBuyInsuranceParams();
  useEnsureInsuredParams();
  const form = useBuyInsuranceForm(urlParams);
  const pricing = useDynamicInsurancePrice(urlParams, form);
  const actions = useBuyInsuranceActions(urlParams, form);

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  return (
    <>
      <ToastContainer theme="colored" rtl position="top-left" />

      <div className="min-h-screen bg-white [direction:rtl]">
        <BuyInsuranceHeader
          title={urlParams.insurerTitle}
          logo={urlParams.insurerLogo}
        />

        <div className="mx-4 mt-[calc(6.7rem/2+20px)] rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-base font-bold">اطلاعات من</span>
            <button
              className="cursor-pointer rounded-lg border-none bg-green-base px-4 py-[6px] text-xs text-white"
              onClick={actions.handleEditClick}
            >
              ویرایش
            </button>
          </div>
          <hr className="my-4 w-full border-0 border-t border-solid border-[#e0e0e0]" />

          {/* Name and phone come from URL params and are shown below */}

          <UserInfoList
            insuredName={form.insuredName}
            insuredPhone={form.insuredPhone}
            displayFieldTitle={form.displayFieldTitle}
            displayGradeTitle={form.displayGradeTitle}
            residencyLabel={form.getResidencyLabel()}
            damageHistoryLabel={form.getDamageHistoryLabel()}
            showPreviousInsuranceFields={form.showPreviousInsuranceFields}
            lastInsuranceLabel={form.getLastInsuranceLabel()}
            endDateLabel={form.getEndDateLabel()}
          />

          <MobileConfirmationCheckbox
            checked={form.mobileCheckboxChecked}
            onChange={form.setMobileCheckboxChecked}
          />

          <DocumentUploadSection
            nationalCardId={form.nationalCardId}
            medicalCardId={form.medicalCardId}
            lastInsuranceFileId={form.lastInsuranceFileId}
            showLastInsuranceUpload={form.showPreviousInsuranceFields}
            onNationalCardChange={form.setNationalCardId}
            onMedicalCardChange={form.setMedicalCardId}
            onLastInsuranceFileChange={form.setLastInsuranceFileId}
          />

          <LocationSection
            provinceLabel={form.getProvinceLabel()}
            cityLabel={form.getCityLabel()}
            postalCode={form.postalCode}
            onProvinceClick={actions.openProvinceModal}
            onCityClick={actions.openCityModal}
            onPostalCodeChange={form.setPostalCode}
          />

          <ClinicSection
            activeClinic={form.activeClinic}
            address={form.address}
            onActiveClinicChange={form.setActiveClinic}
            onAddressChange={form.setAddress}
          />
        </div>

        <BuyInsuranceFooter
          insurerId={urlParams.insurerId}
          mainPrice={pricing.mainPriceToShow}
          finalPrice={pricing.priceToShow}
          discountPercent={pricing.discountPercent}
          isLoading={updateCartLoading}
          onAddToCart={authorizeClientAction(
            cartActionsLoadingHandler(actions.handleAddToCart),
          )}
        />
      </div>
    </>
  );
};

export default BuyInsurancePage;
