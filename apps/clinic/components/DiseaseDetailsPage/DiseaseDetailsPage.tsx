"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";
import DiseaseDetailsSkeleton from "@/components/Skeletons/DiseaseDetailsSkeleton/DiseaseDetailsSkeleton";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { baseUrls, pharmacyPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import {
  isUserLoggedIn,
  authorizeClientAction,
} from "@repo/core/utils/authUtils";
import { canTrackDiseaseView } from "@/utils/diseaseViewTracking";
import { useDiseaseView } from "@/hooks/useDiseaseView";
import sanitize from "@repo/core/utils/sanitize";
import { clinicApi } from "@/api/Api";

// Tailwind classes lifted 1:1 from the old DiseaseDetails.module.scss.
// ponytail: that scss module never defined `error`, `arrow`, `files` or
// `prescriptionItem`, so those refs were always undefined (unstyled); the
// converted markup keeps them class-less on purpose.
const CONTAINER = "bg-white text-[#222]";

// ponytail: header image is physically right-anchored (matches old scss
// exactly); the padding clearing it is physical pr-*, not logical pe-*.
const HEADER =
  "sticky top-14 z-[100] bg-green-base pt-4 [--img-size:6.7rem] [--img-offset-right:10px]";

const HEADER_TOP =
  "relative flex min-h-12 items-end justify-end bg-green-base px-5 pr-[calc(var(--img-size)_+_var(--img-offset-right)_+_10px)] text-left text-base font-bold text-white [direction:ltr]";

const IMG_BADGE =
  "absolute bottom-[calc(var(--img-size)_/_-2)] right-[var(--img-offset-right)] h-[var(--img-size)] w-[var(--img-size)] rounded-[23px] border-4 border-solid border-white bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]";

const HEADER_BOTTOM =
  "flex min-h-16 justify-start bg-white px-5 pr-[calc(var(--img-size)_+_var(--img-offset-right)_+_10px)] text-[0.9rem] font-bold text-green-base text-start";

const SECTION_BUTTON =
  "relative flex w-full items-center justify-center rounded-[10px] border-none bg-green-base px-4 py-[0.7rem] text-center text-[0.9rem] font-semibold text-white";

const SECTION_BUTTON_ICON = "absolute end-4 flex h-full items-center";

const SECTION_CONTENT =
  "mx-[-4rem] mb-4 mt-[-0.7rem] rounded-[10px] border border-solid border-[#eee] bg-white px-[0.8rem] py-[0.6rem] text-[0.9rem] leading-[1.6] shadow-[0_4px_12px_rgba(0,0,0,0.15)] [direction:rtl]";

const DIRECTION_TABS =
  "mb-2.5 flex !w-full items-center justify-between overflow-x-scroll overflow-y-hidden border-0 border-b-2 border-solid border-[#e0e0e0]";

const DIR_TAB_BASE =
  "flex h-[50px] max-h-[50px] flex-1 cursor-pointer items-center justify-center border-0 border-b-[3px] border-solid bg-transparent p-2 text-center font-bold transition-all duration-300";

const dirTabClass = (isActive: boolean) =>
  `${DIR_TAB_BASE} ${
    isActive
      ? "border-b-green-base text-[1rem] text-green-base"
      : "border-b-transparent text-sm text-[#4b4b4b]"
  }`;

const SWITCH_CONTENT =
  "text-justify leading-[1.8] [&_p]:mb-[0.1rem] [&_p:last-child]:mb-0";

const FILE_IMAGE_WRAPPER =
  "flex w-full max-w-full justify-center rounded-[17px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]";

const FILE_IMAGE = "max-h-60 max-w-full rounded-[17px]";

const DIFFERENTIAL_CONTENT = "flex flex-col gap-3";

const DIFFERENTIAL_DESCRIPTION =
  "[&_p]:mb-[0.2rem] [&_p]:leading-[1.7] [&_p:last-child]:mb-0";

// shared by differential + treatment tag lists (identical in the old scss)
const TAG_ROW = "flex flex-wrap gap-2";

const TAG =
  "inline-block whitespace-nowrap rounded-xl bg-green-base px-2.5 py-[5px] text-[0.85rem] !text-white no-underline shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5";

const GALLERY_GRID = "flex flex-col items-center gap-3";

const GALLERY_ITEM =
  "w-full max-w-[520px] overflow-hidden rounded-[14px] bg-[#f8f8f8] shadow-[0_4px_12px_rgba(0,0,0,0.1)]";

const GALLERY_IMAGE = "block h-auto max-h-[360px] w-full object-contain";

// Helper function to check if value is __NO_ACCESS__
const isNoAccess = (value: any): boolean => {
  if (typeof value === "string") {
    return value === "__NO_ACCESS__";
  }
  return false;
};

// Helper function to check if array/object contains __NO_ACCESS__
const hasNoAccess = (value: any): boolean => {
  if (isNoAccess(value)) return true;
  if (Array.isArray(value) && value.length > 0 && isNoAccess(value[0]))
    return true;
  return false;
};

// Type guards
const isTreatmentObject = (
  value: any,
): value is { plan: string[]; order: string[]; prescription: string[] } => {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !isNoAccess(value)
  );
};

const isClinicalObject = (
  value: any,
): value is { sign: string[]; symptom: string[] } => {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !isNoAccess(value)
  );
};

const isIntroductionObject = (
  value: any,
): value is { type: string[]; preface: string[]; definition: string[] } => {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !isNoAccess(value)
  );
};

const isDiseaseArray = (
  value: any,
): value is { id: number; title_fa: string; title_en: string }[] => {
  return Array.isArray(value) && !hasNoAccess(value);
};

const isStringArray = (value: any): value is string[] => {
  return Array.isArray(value) && !hasNoAccess(value);
};

export default function DiseaseDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [openSections, setOpenSections] = useState<string[]>(["introduction"]);
  const [introductionType, setIntroductionType] = useState<string>("preface");
  const [treatmentType, setTreatmentType] = useState<string>("plan");
  const [clinicalType, setClinicalType] = useState<"sign" | "symptom">("sign");
  const hasRecordedViewRef = useRef(false);

  const { recordDiseaseView } = useDiseaseView();

  const { data, isLoading, error } = useQuery({
    queryKey: ["disease-details", id],
    queryFn: async () => {
      if (!id) throw new Error("No id");
      const res = await clinicApi.getDiseaseDetails(Number(id));
      return res.data.data;
    },
    enabled: !!id,
  });

  const toggleSection = (key: string) => {
    // Check if this section has __NO_ACCESS__
    if (data) {
      const section = allSections.find((s) => s.key === key);
      if (section && section.hasNoAccess) {
        authorizeClientAction(() => {
          modalActions.addModal(ModalTypes.EXAM_DISCOUNT_PLANS);
        })();
        return;
      }
    }

    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((section) => section !== key)
        : [...prev, key],
    );
  };

  useEffect(() => {
    if (data) {
      if (isIntroductionObject(data.introduction)) {
        const intro = data.introduction;
        if (isStringArray(intro.preface) && intro.preface.length) {
          setIntroductionType("preface");
        } else if (isStringArray(intro.definition) && intro.definition.length) {
          setIntroductionType("definition");
        } else if (isStringArray(intro.type) && intro.type.length) {
          setIntroductionType("type");
        }
      }

      const treatmentParam = searchParams.get("treatment");
      if (treatmentParam && isTreatmentObject(data.treatment_description)) {
        setOpenSections(["treatment"]);

        const treatDesc = data.treatment_description;
        if (
          treatmentParam === "prescription" &&
          isStringArray(treatDesc.prescription) &&
          treatDesc.prescription.length
        ) {
          setTreatmentType("prescription");
        } else if (
          treatmentParam === "order" &&
          isStringArray(treatDesc.order) &&
          treatDesc.order.length
        ) {
          setTreatmentType("order");
        } else if (treatmentParam === "both") {
          if (
            isStringArray(treatDesc.prescription) &&
            treatDesc.prescription.length
          ) {
            setTreatmentType("prescription");
          } else if (isStringArray(treatDesc.order) && treatDesc.order.length) {
            setTreatmentType("order");
          }
        }
      } else {
        if (isTreatmentObject(data.treatment_description)) {
          const treatDesc = data.treatment_description;
          if (isStringArray(treatDesc.plan) && treatDesc.plan.length) {
            setTreatmentType("plan");
          } else if (
            isStringArray(treatDesc.prescription) &&
            treatDesc.prescription.length
          ) {
            setTreatmentType("prescription");
          } else if (isStringArray(treatDesc.order) && treatDesc.order.length) {
            setTreatmentType("order");
          }
        }
      }

      if (isClinicalObject(data.clinical_demonstration)) {
        const clinical = data.clinical_demonstration;
        if (isStringArray(clinical.sign) && clinical.sign.length) {
          setClinicalType("sign");
        } else if (isStringArray(clinical.symptom) && clinical.symptom.length) {
          setClinicalType("symptom");
        }
      }
    }
  }, [data, searchParams]);

  // Reset ref when disease ID changes
  useEffect(() => {
    hasRecordedViewRef.current = false;
  }, [id]);

  // Track disease view when sections are opened (once per day per disease)
  // Only track when user opens sections other than "introduction" (which is always open)
  useEffect(() => {
    if (!id || !data || openSections.length === 0) return;

    const diseaseId = Number(id);
    if (!diseaseId || isNaN(diseaseId)) return;

    // Check if user has opened any section other than "introduction"
    const hasOpenedOtherSection = openSections.some(
      (section) => section !== "introduction",
    );

    if (!hasOpenedOtherSection) return;

    // Check if we've already tried to record this view in this session
    if (hasRecordedViewRef.current) return;

    // Check if user is logged in and hasn't viewed this disease today
    if (canTrackDiseaseView(diseaseId, isUserLoggedIn)) {
      hasRecordedViewRef.current = true;
      recordDiseaseView(diseaseId);
    }
  }, [id, data, openSections, recordDiseaseView]);

  if (isLoading) return <DiseaseDetailsSkeleton />;
  if (error || !data)
    return <div>خطا در دریافت اطلاعات</div>;

  const disease = data;

  // Safe checks for arrays
  const hasPrescriptionSection =
    isTreatmentObject(disease.treatment_description) &&
    isStringArray(disease.treatment_description.prescription) &&
    disease.treatment_description.prescription.length > 0;

  const hasOrderSection =
    isTreatmentObject(disease.treatment_description) &&
    isStringArray(disease.treatment_description.order) &&
    disease.treatment_description.order.length > 0;

  const hasTreatmentMedications =
    isDiseaseArray(disease.treatment) && disease.treatment.length > 0;

  const getImagesByUseType = (
    sectionKey: string,
    subType?: string,
  ): typeof disease.files => {
    if (!disease.files?.length) return [];

    const useTypeMap: Record<string, number[] | Record<string, number>> = {
      introduction: {
        preface: 9,
        definition: 10,
        type: 11,
      },
      epidemiology: [12],
      physiopathology: [13],
      risk_factor: [14],
      treatment: {
        plan: 15,
        prescription: 16,
        order: 17,
      },
      differential: [18],
      prognosis: [19],
      side_effect: [20],
      clinical: {
        symptom: 21,
        sign: 22,
      },
      physical_exam: [23],
      paraclinic: [24],
      diagnosis: [25],
      prevention: [26],
      complementary: [27],
      gallery: [28],
    };

    const sectionMap = useTypeMap[sectionKey];
    if (!sectionMap) return [];

    let useTypes: number[] = [];
    if (Array.isArray(sectionMap)) {
      useTypes = sectionMap;
    } else if (
      subType &&
      typeof sectionMap === "object" &&
      !Array.isArray(sectionMap)
    ) {
      const useType = (sectionMap as Record<string, number>)[subType];
      if (useType) useTypes = [useType];
    }

    return disease.files.filter((file) => useTypes.includes(file.use_type));
  };

  const galleryImages = getImagesByUseType("gallery");

  const allSections = [
    {
      key: "introduction",
      label: "معرفی",
      hasNoAccess: isNoAccess(disease.introduction),
      content: isNoAccess(disease.introduction)
        ? "NO_ACCESS"
        : isIntroductionObject(disease.introduction) &&
            ((isStringArray(disease.introduction.type) &&
              disease.introduction.type.length) ||
              (isStringArray(disease.introduction.preface) &&
                disease.introduction.preface.length) ||
              (isStringArray(disease.introduction.definition) &&
                disease.introduction.definition.length))
          ? "INTRODUCTION_COMPONENT"
          : null,
    },
    {
      key: "treatment",
      label: "درمان",
      hasNoAccess:
        isNoAccess(disease.treatment_description) ||
        isNoAccess(disease.treatment),
      content:
        isNoAccess(disease.treatment_description) ||
        isNoAccess(disease.treatment)
          ? "NO_ACCESS"
          : (isTreatmentObject(disease.treatment_description) &&
                ((isStringArray(disease.treatment_description.plan) &&
                  disease.treatment_description.plan.length) ||
                  (isStringArray(disease.treatment_description.order) &&
                    disease.treatment_description.order.length) ||
                  (isStringArray(disease.treatment_description.prescription) &&
                    disease.treatment_description.prescription.length))) ||
              (isDiseaseArray(disease.treatment) && disease.treatment.length)
            ? "TREATMENT_COMPONENT"
            : null,
    },
    {
      key: "epidemiology",
      label: "اپیدمیولوژی",
      hasNoAccess: isNoAccess(disease.epidemiology),
      content: isNoAccess(disease.epidemiology)
        ? "NO_ACCESS"
        : disease.epidemiology,
    },
    {
      key: "physiopathology",
      label: "فیزیوپاتولوژی و اتیولوژی",
      hasNoAccess: isNoAccess(disease.physiopathology),
      content: isNoAccess(disease.physiopathology)
        ? "NO_ACCESS"
        : disease.physiopathology,
    },
    {
      key: "risk_factor",
      label: "(Risk Factors)عوامل خطر",
      hasNoAccess: hasNoAccess(disease.risk_factor),
      content: hasNoAccess(disease.risk_factor)
        ? "NO_ACCESS"
        : isStringArray(disease.risk_factor) && disease.risk_factor.length
          ? disease.risk_factor.map((r) => `✓ ${r}`).join("<br/>")
          : null,
    },
    {
      key: "clinical",
      label: "تظاهرات بالینی",
      hasNoAccess: isNoAccess(disease.clinical_demonstration),
      content: isNoAccess(disease.clinical_demonstration)
        ? "NO_ACCESS"
        : isClinicalObject(disease.clinical_demonstration) &&
            ((isStringArray(disease.clinical_demonstration.sign) &&
              disease.clinical_demonstration.sign.length) ||
              (isStringArray(disease.clinical_demonstration.symptom) &&
                disease.clinical_demonstration.symptom.length))
          ? "CLINICAL_COMPONENT"
          : null,
    },
    {
      key: "physical_exam",
      label: "معاینات فیزیکی",
      hasNoAccess: isNoAccess(disease.physical_exam),
      content: isNoAccess(disease.physical_exam)
        ? "NO_ACCESS"
        : disease.physical_exam,
    },
    {
      key: "paraclinic",
      label: "یافته‌های پاراکلینیکی",
      hasNoAccess: hasNoAccess(disease.paraclinic_info),
      content: hasNoAccess(disease.paraclinic_info)
        ? "NO_ACCESS"
        : isStringArray(disease.paraclinic_info) &&
            disease.paraclinic_info.length
          ? disease.paraclinic_info.map((p) => `✓ ${p}`).join("<br/>")
          : null,
    },
    {
      key: "differential",
      label: "تشخیص افتراقی",
      hasNoAccess:
        hasNoAccess(disease.differential_diagnosis_description) ||
        hasNoAccess(disease.differential_diagnosis),
      content: (() => {
        if (
          hasNoAccess(disease.differential_diagnosis_description) ||
          hasNoAccess(disease.differential_diagnosis)
        ) {
          return "NO_ACCESS";
        }

        const hasDescriptions =
          isStringArray(disease.differential_diagnosis_description) &&
          disease.differential_diagnosis_description.length;
        const hasRelatedDiseases =
          isDiseaseArray(disease.differential_diagnosis) &&
          disease.differential_diagnosis.length;

        if (!hasDescriptions && !hasRelatedDiseases) return null;

        return (
          <div className={DIFFERENTIAL_CONTENT}>
            {hasDescriptions &&
            isStringArray(disease.differential_diagnosis_description) ? (
              <div className={DIFFERENTIAL_DESCRIPTION}>
                {disease.differential_diagnosis_description.map(
                  (description, index) => (
                    <p key={index}>✓ {description}</p>
                  ),
                )}
              </div>
            ) : null}

            {hasRelatedDiseases &&
            isDiseaseArray(disease.differential_diagnosis) ? (
              <div className={TAG_ROW}>
                {disease.differential_diagnosis.map((diffDisease) => (
                  <Link
                    key={diffDisease.id}
                    href={`/disease/${diffDisease.id}`}
                    className={TAG}
                  >
                    {diffDisease.title_fa}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })(),
    },
    {
      key: "prognosis",
      label: "پیش‌آگهی",
      hasNoAccess: isNoAccess(disease.prognosis),
      content: isNoAccess(disease.prognosis) ? "NO_ACCESS" : disease.prognosis,
    },
    {
      key: "side_effect",
      label: "عوارض",
      hasNoAccess: isNoAccess(disease.side_effect),
      content: isNoAccess(disease.side_effect)
        ? "NO_ACCESS"
        : disease.side_effect,
    },
    {
      key: "diagnosis",
      label: "تشخیص",
      hasNoAccess: isNoAccess(disease.diagnosis),
      content: isNoAccess(disease.diagnosis) ? "NO_ACCESS" : disease.diagnosis,
    },
    {
      key: "prevention",
      label: "پیشگیری",
      hasNoAccess: isNoAccess(disease.prevention),
      content: isNoAccess(disease.prevention)
        ? "NO_ACCESS"
        : disease.prevention,
    },
    {
      key: "complementary",
      label: "طب مکمل",
      hasNoAccess: isNoAccess(disease.complementary_medicine),
      content: isNoAccess(disease.complementary_medicine)
        ? "NO_ACCESS"
        : disease.complementary_medicine,
    },
    {
      key: "point",
      label: "نکات",
      hasNoAccess: hasNoAccess(disease.point),
      content: hasNoAccess(disease.point)
        ? "NO_ACCESS"
        : isStringArray(disease.point) && disease.point.length
          ? disease.point.map((p) => `✓ ${p}`).join("<br/>")
          : null,
    },
    {
      key: "gallery",
      label: "گالری",
      hasNoAccess: false,
      content: galleryImages.length ? "GALLERY_COMPONENT" : null,
    },
  ];

  const treatmentParam = searchParams.get("treatment");
  const showOnlyTreatment = !!treatmentParam;

  const availableSections = allSections.filter((section) => {
    if (showOnlyTreatment) {
      return section.key === "treatment";
    }

    // Show section if it has NO_ACCESS or has content
    if (section.content === "NO_ACCESS") return true;
    if (section.content === null) return false;
    if (typeof section.content === "string") {
      return section.content.trim() !== "";
    }
    return true;
  });

  return (
    <div className={CONTAINER}>
      <div className={HEADER}>
        <div className={HEADER_TOP}>
          {disease.title_en}
          <div>
            {disease.picture ? (
              <Image
                src={disease.picture ? disease.picture : ""}
                alt={disease.title_fa}
                width={140}
                height={140}
                className={IMG_BADGE}
              />
            ) : (
              <PillsIcon
                className={`${IMG_BADGE} p-[15px]`}
                width={100}
                height={100}
              />
            )}
          </div>
        </div>

        <div className={HEADER_BOTTOM}>{disease.title_fa}</div>
      </div>

      <div className="mx-20 my-4">
        {availableSections.map(
          ({ key, label, content, hasNoAccess: sectionHasNoAccess }) => (
            <div key={key}>
              <div className="mb-[0.6rem]">
                <div
                  className={`${SECTION_BUTTON} ${
                    key === "treatment" ? "!bg-[#c51d47]" : ""
                  }`}
                  onClick={() => toggleSection(key)}
                >
                  {label}
                  <span className={SECTION_BUTTON_ICON}>
                    {openSections.includes(key) ? (
                      <DownArrow />
                    ) : (
                      <LeftArrow />
                    )}
                  </span>
                </div>
              </div>

              {openSections.includes(key) && content !== "NO_ACCESS" && (
                <div className={SECTION_CONTENT}>
                  {content === "INTRODUCTION_COMPONENT" &&
                  isIntroductionObject(disease.introduction) ? (
                    <div className="mt-2.5">
                      <div className={DIRECTION_TABS}>
                        {isStringArray(disease.introduction.preface) &&
                        disease.introduction.preface.length ? (
                          <div
                            className={dirTabClass(
                              introductionType === "preface",
                            )}
                            onClick={() => setIntroductionType("preface")}
                          >
                            مقدمه
                          </div>
                        ) : null}

                        {isStringArray(disease.introduction.definition) &&
                        disease.introduction.definition.length ? (
                          <div
                            className={dirTabClass(
                              introductionType === "definition",
                            )}
                            onClick={() => setIntroductionType("definition")}
                          >
                            تعریف
                          </div>
                        ) : null}

                        {isStringArray(disease.introduction.type) &&
                        disease.introduction.type.length ? (
                          <div
                            className={dirTabClass(introductionType === "type")}
                            onClick={() => setIntroductionType("type")}
                          >
                            انواع
                          </div>
                        ) : null}
                      </div>

                      <div className={SWITCH_CONTENT}>
                        {introductionType === "type" &&
                          isStringArray(disease.introduction.type) &&
                          disease.introduction.type.map((item, index) => (
                            <p key={index}>✓ {item}</p>
                          ))}

                        {introductionType === "preface" &&
                          isStringArray(disease.introduction.preface) &&
                          disease.introduction.preface.map((item, index) => (
                            <p key={index}>✓ {item}</p>
                          ))}

                        {introductionType === "definition" &&
                          isStringArray(disease.introduction.definition) &&
                          disease.introduction.definition.map((item, index) => (
                            <p key={index}>✓ {item}</p>
                          ))}

                        <>
                          {getImagesByUseType("introduction", introductionType)
                            .length > 0 && (
                            <div>
                              {getImagesByUseType(
                                "introduction",
                                introductionType,
                              ).map((f) => (
                                <div
                                  key={f.id}
                                  className={FILE_IMAGE_WRAPPER}
                                >
                                  <img
                                    src={f.file}
                                    alt="file"
                                    className={FILE_IMAGE}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      </div>
                    </div>
                  ) : content === "TREATMENT_COMPONENT" &&
                    isTreatmentObject(disease.treatment_description) ? (
                    <>
                      <div className="mt-2.5">
                        <div className={DIRECTION_TABS}>
                          {isStringArray(disease.treatment_description.plan) &&
                          disease.treatment_description.plan.length ? (
                            <div
                              className={dirTabClass(treatmentType === "plan")}
                              onClick={() => setTreatmentType("plan")}
                            >
                              برنامه
                            </div>
                          ) : null}

                          {isStringArray(
                            disease.treatment_description.prescription,
                          ) &&
                          disease.treatment_description.prescription.length ? (
                            <div
                              className={dirTabClass(
                                treatmentType === "prescription",
                              )}
                              onClick={() => setTreatmentType("prescription")}
                            >
                              <>
                                نسخه{" "}
                                {isStringArray(
                                  disease.treatment_description.order,
                                ) && disease.treatment_description.order.length
                                  ? ""
                                  : "و اوردر "}
                              </>
                            </div>
                          ) : null}

                          {isStringArray(disease.treatment_description.order) &&
                          disease.treatment_description.order.length ? (
                            <div
                              className={dirTabClass(treatmentType === "order")}
                              onClick={() => setTreatmentType("order")}
                            >
                              <>
                                {isStringArray(
                                  disease.treatment_description.prescription,
                                ) &&
                                disease.treatment_description.prescription
                                  .length
                                  ? ""
                                  : "نسخه و "}
                              </>
                              اوردر
                            </div>
                          ) : null}
                        </div>

                        <div className={SWITCH_CONTENT}>
                          {treatmentType === "plan" &&
                            isStringArray(disease.treatment_description.plan) &&
                            disease.treatment_description.plan.map(
                              (item, index) => <p key={index}>✓ {item}</p>,
                            )}

                          {treatmentType === "prescription" &&
                            isStringArray(
                              disease.treatment_description.prescription,
                            ) &&
                            disease.treatment_description.prescription.map(
                              (item, index) => (
                                <p key={index}>✓ {item}</p>
                              ),
                            )}
                          {treatmentType === "prescription" &&
                            hasPrescriptionSection &&
                            hasTreatmentMedications &&
                            isDiseaseArray(disease.treatment) && (
                              <div className={TAG_ROW}>
                                {disease.treatment.map((med) => (
                                  <Link
                                    key={med.id}
                                    href={`${baseUrls[Apps.PHARMACY as keyof typeof baseUrls]}${pharmacyPaths.single}/${med.id}`}
                                    className={TAG}
                                  >
                                    {med.title_fa}
                                  </Link>
                                ))}
                              </div>
                            )}

                          {treatmentType === "order" &&
                            isStringArray(
                              disease.treatment_description.order,
                            ) &&
                            disease.treatment_description.order.map(
                              (item, index) => <p key={index}>✓ {item}</p>,
                            )}
                          {treatmentType === "order" &&
                            !hasPrescriptionSection &&
                            hasOrderSection &&
                            hasTreatmentMedications &&
                            isDiseaseArray(disease.treatment) && (
                              <div className={TAG_ROW}>
                                {disease.treatment.map((med) => (
                                  <Link
                                    key={med.id}
                                    href={`${baseUrls[Apps.PHARMACY as keyof typeof baseUrls]}${pharmacyPaths.single}/${med.id}`}
                                    className={TAG}
                                  >
                                    {med.title_fa}
                                  </Link>
                                ))}
                              </div>
                            )}
                          {getImagesByUseType("treatment", treatmentType)
                            .length > 0 && (
                            <div>
                              {getImagesByUseType(
                                "treatment",
                                treatmentType,
                              ).map((f) => (
                                <div
                                  key={f.id}
                                  className={FILE_IMAGE_WRAPPER}
                                >
                                  <img
                                    src={f.file}
                                    alt="file"
                                    className={FILE_IMAGE}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : content === "CLINICAL_COMPONENT" &&
                    isClinicalObject(disease.clinical_demonstration) ? (
                    <>
                      <div className="mt-2.5">
                        <div className={DIRECTION_TABS}>
                          {isStringArray(disease.clinical_demonstration.sign) &&
                          disease.clinical_demonstration.sign.length ? (
                            <div
                              className={dirTabClass(clinicalType === "sign")}
                              onClick={() => setClinicalType("sign")}
                            >
                              علائم (sign)
                            </div>
                          ) : null}

                          {isStringArray(
                            disease.clinical_demonstration.symptom,
                          ) && disease.clinical_demonstration.symptom.length ? (
                            <div
                              className={dirTabClass(clinicalType === "symptom")}
                              onClick={() => setClinicalType("symptom")}
                            >
                              نشانه‌ها (symptom)
                            </div>
                          ) : null}
                        </div>

                        <div className={SWITCH_CONTENT}>
                          {clinicalType === "sign" &&
                            isStringArray(
                              disease.clinical_demonstration.sign,
                            ) &&
                            disease.clinical_demonstration.sign.map(
                              (item, index) => <p key={index}>{item}</p>,
                            )}

                          {clinicalType === "symptom" &&
                            isStringArray(
                              disease.clinical_demonstration.symptom,
                            ) &&
                            disease.clinical_demonstration.symptom.map(
                              (item, index) => <p key={index}>{item}</p>,
                            )}

                          {getImagesByUseType("clinical", clinicalType).length >
                            0 && (
                            <div>
                              {getImagesByUseType("clinical", clinicalType).map(
                                (f) => (
                                  <div
                                    key={f.id}
                                    className={FILE_IMAGE_WRAPPER}
                                  >
                                    <img
                                      src={f.file}
                                      alt="file"
                                      className={FILE_IMAGE}
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : content === "GALLERY_COMPONENT" ? (
                    <div className={GALLERY_GRID}>
                      {galleryImages.map((file) => (
                        <div key={file.id} className={GALLERY_ITEM}>
                          <img
                            src={file.file}
                            alt="gallery image"
                            className={GALLERY_IMAGE}
                          />
                        </div>
                      ))}
                    </div>
                  ) : typeof content === "string" ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitize(content),
                        }}
                      />
                      {getImagesByUseType(key).length > 0 && (
                        <div>
                          {getImagesByUseType(key).map((f) => (
                            <div key={f.id} className={FILE_IMAGE_WRAPPER}>
                              <img
                                src={f.file}
                                alt="file"
                                className={FILE_IMAGE}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {getImagesByUseType(key).length > 0 && (
                        <div>
                          {getImagesByUseType(key).map((f) => (
                            <Image
                              key={f.id}
                              src={f.file}
                              alt="file"
                              width={120}
                              height={120}
                              className={FILE_IMAGE}
                            />
                          ))}
                        </div>
                      )}
                      {content}
                    </>
                  )}
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
