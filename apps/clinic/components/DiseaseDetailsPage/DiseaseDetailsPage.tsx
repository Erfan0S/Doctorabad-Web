"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DiseaseDetails.module.scss";
import { clinicApi } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";
import InteractionSection from "./InteractionSection/InteractionSection";
import DiseaseDetailsSkeleton from "@/components/Skeletons/DiseaseDetailsSkeleton/DiseaseDetailsSkeleton";
import type { DiseaseDetails } from "@/types/clinic";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { baseUrls, pharmacyPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { isUserLoggedIn, authorizeClientAction } from "@repo/core/utils/authUtils";
import { canTrackDiseaseView } from "@/utils/diseaseViewTracking";
import { useDiseaseView } from "@/hooks/useDiseaseView";

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
  if (Array.isArray(value) && value.length > 0 && isNoAccess(value[0])) return true;
  return false;
};

// Type guards
const isTreatmentObject = (
  value: any
): value is { plan: string[]; order: string[]; prescription: string[] } => {
  return value && typeof value === "object" && !Array.isArray(value) && !isNoAccess(value);
};

const isClinicalObject = (
  value: any
): value is { sign: string[]; symptom: string[] } => {
  return value && typeof value === "object" && !Array.isArray(value) && !isNoAccess(value);
};

const isIntroductionObject = (
  value: any
): value is { type: string[]; preface: string[]; definition: string[] } => {
  return value && typeof value === "object" && !Array.isArray(value) && !isNoAccess(value);
};

const isDiseaseArray = (
  value: any
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
      const section = allSections.find(s => s.key === key);
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
        : [...prev, key]
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
        if (treatmentParam === "prescription" && isStringArray(treatDesc.prescription) && treatDesc.prescription.length) {
          setTreatmentType("prescription");
        } else if (treatmentParam === "order" && isStringArray(treatDesc.order) && treatDesc.order.length) {
          setTreatmentType("order");
        } else if (treatmentParam === "both") {
          if (isStringArray(treatDesc.prescription) && treatDesc.prescription.length) {
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
          } else if (isStringArray(treatDesc.prescription) && treatDesc.prescription.length) {
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
      (section) => section !== "introduction"
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
    return <div className={styles.error}>خطا در دریافت اطلاعات</div>;

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
    
  const hasTreatmentMedications = isDiseaseArray(disease.treatment) && disease.treatment.length > 0;

  const getImagesByUseType = (
    sectionKey: string,
    subType?: string
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
      content:
        isNoAccess(disease.introduction) ? "NO_ACCESS" :
        (isIntroductionObject(disease.introduction) && (
          (isStringArray(disease.introduction.type) && disease.introduction.type.length) ||
          (isStringArray(disease.introduction.preface) && disease.introduction.preface.length) ||
          (isStringArray(disease.introduction.definition) && disease.introduction.definition.length)
        )) ? "INTRODUCTION_COMPONENT" : null,
    },
    {
      key: "treatment",
      label: "درمان",
      hasNoAccess: isNoAccess(disease.treatment_description) || isNoAccess(disease.treatment),
      content:
        isNoAccess(disease.treatment_description) || isNoAccess(disease.treatment) ? "NO_ACCESS" :
        ((isTreatmentObject(disease.treatment_description) && (
          (isStringArray(disease.treatment_description.plan) && disease.treatment_description.plan.length) ||
          (isStringArray(disease.treatment_description.order) && disease.treatment_description.order.length) ||
          (isStringArray(disease.treatment_description.prescription) && disease.treatment_description.prescription.length)
        )) || (isDiseaseArray(disease.treatment) && disease.treatment.length))
          ? "TREATMENT_COMPONENT"
          : null,
    },
    {
      key: "epidemiology",
      label: "اپیدمیولوژی",
      hasNoAccess: isNoAccess(disease.epidemiology),
      content: isNoAccess(disease.epidemiology) ? "NO_ACCESS" : disease.epidemiology,
    },
    {
      key: "physiopathology",
      label: "فیزیوپاتولوژی و اتیولوژی",
      hasNoAccess: isNoAccess(disease.physiopathology),
      content: isNoAccess(disease.physiopathology) ? "NO_ACCESS" : disease.physiopathology,
    },
    {
      key: "risk_factor",
      label: "(Risk Factors)عوامل خطر",
      hasNoAccess: hasNoAccess(disease.risk_factor),
      content: hasNoAccess(disease.risk_factor) ? "NO_ACCESS" :
        (isStringArray(disease.risk_factor) && disease.risk_factor.length
          ? disease.risk_factor.map((r) => `✓ ${r}`).join("<br/>")
          : null),
    },
    {
      key: "clinical",
      label: "تظاهرات بالینی",
      hasNoAccess: isNoAccess(disease.clinical_demonstration),
      content:
        isNoAccess(disease.clinical_demonstration) ? "NO_ACCESS" :
        (isClinicalObject(disease.clinical_demonstration) && (
          (isStringArray(disease.clinical_demonstration.sign) && disease.clinical_demonstration.sign.length) ||
          (isStringArray(disease.clinical_demonstration.symptom) && disease.clinical_demonstration.symptom.length)
        )) ? "CLINICAL_COMPONENT" : null,
    },
    {
      key: "physical_exam",
      label: "معاینات فیزیکی",
      hasNoAccess: isNoAccess(disease.physical_exam),
      content: isNoAccess(disease.physical_exam) ? "NO_ACCESS" : disease.physical_exam,
    },
    {
      key: "paraclinic",
      label: "یافته‌های پاراکلینیکی",
      hasNoAccess: hasNoAccess(disease.paraclinic_info),
      content: hasNoAccess(disease.paraclinic_info) ? "NO_ACCESS" :
        (isStringArray(disease.paraclinic_info) && disease.paraclinic_info.length
          ? disease.paraclinic_info.map((p) => `✓ ${p}`).join("<br/>")
          : null),
    },
    {
      key: "differential",
      label: "تشخیص افتراقی",
      hasNoAccess: hasNoAccess(disease.differential_diagnosis_description) || hasNoAccess(disease.differential_diagnosis),
      content: (() => {
        if (hasNoAccess(disease.differential_diagnosis_description) || hasNoAccess(disease.differential_diagnosis)) {
          return "NO_ACCESS";
        }

        const hasDescriptions = isStringArray(disease.differential_diagnosis_description) && disease.differential_diagnosis_description.length;
        const hasRelatedDiseases = isDiseaseArray(disease.differential_diagnosis) && disease.differential_diagnosis.length;

        if (!hasDescriptions && !hasRelatedDiseases) return null;

        return (
          <div className={styles.differentialContent}>
            {hasDescriptions && isStringArray(disease.differential_diagnosis_description) ? (
              <div className={styles.differentialDescription}>
                {disease.differential_diagnosis_description.map(
                  (description, index) => (
                    <p key={index}>✓ {description}</p>
                  )
                )}
              </div>
            ) : null}

            {hasRelatedDiseases && isDiseaseArray(disease.differential_diagnosis) ? (
              <div className={styles.differentialTags}>
                {disease.differential_diagnosis.map((diffDisease) => (
                  <Link
                    key={diffDisease.id}
                    href={`/disease/${diffDisease.id}`}
                    className={styles.differentialTag}
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
      content: isNoAccess(disease.side_effect) ? "NO_ACCESS" : disease.side_effect,
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
      content: isNoAccess(disease.prevention) ? "NO_ACCESS" : disease.prevention,
    },
    {
      key: "complementary",
      label: "طب مکمل",
      hasNoAccess: isNoAccess(disease.complementary_medicine),
      content: isNoAccess(disease.complementary_medicine) ? "NO_ACCESS" : disease.complementary_medicine,
    },
    {
      key: "point",
      label: "نکات",
      hasNoAccess: hasNoAccess(disease.point),
      content: hasNoAccess(disease.point) ? "NO_ACCESS" :
        (isStringArray(disease.point) && disease.point.length
          ? disease.point.map((p) => `✓ ${p}`).join("<br/>")
          : null),
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.top}>
          {disease.title_en}
          <div>
            {disease.picture ? (
              <Image
                src={disease.picture ? disease.picture : ""}
                alt={disease.title_fa}
                width={140}
                height={140}
                className={styles.image}
              />
            ) : (
              <PillsIcon
                className={styles.pillsIcon}
                width={100}
                height={100}
              />
            )}
          </div>
        </div>

        <div className={styles.bottom}>{disease.title_fa}</div>
      </div>

      <div className={styles.sections}>
        {availableSections.map(({ key, label, content, hasNoAccess: sectionHasNoAccess }) => (
          <div key={key}>
            <div className={styles.section}>
              <div
                className={`${styles.sectionButton} ${
                  key === "treatment" ? styles.treatmentButton : ""
                }`}
                onClick={() => toggleSection(key)}
              >
                {label}
                <span>
                  {openSections.includes(key) ? (
                    <DownArrow className={styles.arrow} />
                  ) : (
                    <LeftArrow className={styles.arrow} />
                  )}
                </span>
              </div>
            </div>

            {openSections.includes(key) && content !== "NO_ACCESS" && (
              <div className={styles.sectionContent}>
                {content === "INTRODUCTION_COMPONENT" && isIntroductionObject(disease.introduction) ? (
                  <div className={styles.directionContainer}>
                    <div className={styles.directionTabs}>
                      {isStringArray(disease.introduction.preface) && disease.introduction.preface.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            introductionType === "preface" ? styles.active : ""
                          }`}
                          onClick={() => setIntroductionType("preface")}
                        >
                          مقدمه
                        </div>
                      ) : null}

                      {isStringArray(disease.introduction.definition) && disease.introduction.definition.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            introductionType === "definition"
                              ? styles.active
                              : ""
                          }`}
                          onClick={() => setIntroductionType("definition")}
                        >
                          تعریف
                        </div>
                      ) : null}

                      {isStringArray(disease.introduction.type) && disease.introduction.type.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            introductionType === "type" ? styles.active : ""
                          }`}
                          onClick={() => setIntroductionType("type")}
                        >
                          انواع
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.switchContent}>
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
                          <div className={styles.files}>
                            {getImagesByUseType(
                              "introduction",
                              introductionType
                            ).map((f) => (
                              <div key={f.id} className={styles.fileImageWrapper}>
                                <img
                                  src={f.file}
                                  alt="file"
                                  className={styles.fileImage}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                ) : content === "TREATMENT_COMPONENT" && isTreatmentObject(disease.treatment_description) ? (
                  <>
                    <div className={styles.directionContainer}>
                      <div className={styles.directionTabs}>
                        {isStringArray(disease.treatment_description.plan) && disease.treatment_description.plan.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              treatmentType === "plan" ? styles.active : ""
                            }`}
                            onClick={() => setTreatmentType("plan")}
                          >
                            برنامه
                          </div>
                        ) : null}

                        {isStringArray(disease.treatment_description.prescription) && disease.treatment_description.prescription.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              treatmentType === "prescription"
                                ? styles.active
                                : ""
                            }`}
                            onClick={() => setTreatmentType("prescription")}
                          >
                            <>
                              نسخه{" "}
                              {isStringArray(disease.treatment_description.order) && disease.treatment_description.order.length
                                ? ""
                                : "و اوردر "}
                            </>
                          </div>
                        ) : null}

                        {isStringArray(disease.treatment_description.order) && disease.treatment_description.order.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              treatmentType === "order" ? styles.active : ""
                            }`}
                            onClick={() => setTreatmentType("order")}
                          >
                            <>
                              {isStringArray(disease.treatment_description.prescription) && disease.treatment_description.prescription.length
                                ? ""
                                : "نسخه و "}
                            </>
                            اوردر
                          </div>
                        ) : null}
                      </div>

                      <div className={styles.switchContent}>
                        {treatmentType === "plan" &&
                          isStringArray(disease.treatment_description.plan) &&
                          disease.treatment_description.plan.map(
                            (item, index) => <p key={index}>✓ {item}</p>
                          )}

                        {treatmentType === "prescription" &&
                          isStringArray(disease.treatment_description.prescription) &&
                          disease.treatment_description.prescription.map(
                            (item, index) => (
                              <p
                                className={styles.prescriptionItem}
                                key={index}
                              >
                                ✓ {item}
                              </p>
                            )
                          )}
                        {treatmentType === "prescription" &&
                          hasPrescriptionSection &&
                          hasTreatmentMedications &&
                          isDiseaseArray(disease.treatment) && (
                            <div className={styles.treatmentTags}>
                              {disease.treatment.map((med) => (
                                <Link
                                  key={med.id}
                                  href={`${baseUrls[Apps.PHARMACY]}${pharmacyPaths.single}/${med.id}`}
                                  className={styles.treatmentTag}
                                >
                                  {med.title_fa}
                                </Link>
                              ))}
                            </div>
                          )}

                        {treatmentType === "order" &&
                          isStringArray(disease.treatment_description.order) &&
                          disease.treatment_description.order.map(
                            (item, index) => <p key={index}>✓ {item}</p>
                          )}
                        {treatmentType === "order" &&
                          !hasPrescriptionSection &&
                          hasOrderSection &&
                          hasTreatmentMedications &&
                          isDiseaseArray(disease.treatment) && (
                            <div className={styles.treatmentTags}>
                              {disease.treatment.map((med) => (
                                <Link
                                  key={med.id}
                                  href={`${baseUrls[Apps.PHARMACY]}${pharmacyPaths.single}/${med.id}`}
                                  className={styles.treatmentTag}
                                >
                                  {med.title_fa}
                                </Link>
                              ))}
                            </div>
                          )}
                        {getImagesByUseType("treatment", treatmentType).length >
                          0 && (
                          <div className={styles.files}>
                            {getImagesByUseType("treatment", treatmentType).map(
                              (f) => (
                                <div key={f.id} className={styles.fileImageWrapper}>
                                  <img
                                    src={f.file}
                                    alt="file"
                                    className={styles.fileImage}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : content === "CLINICAL_COMPONENT" && isClinicalObject(disease.clinical_demonstration) ? (
                  <>
                    <div className={styles.directionContainer}>
                      <div className={styles.directionTabs}>
                        {isStringArray(disease.clinical_demonstration.sign) && disease.clinical_demonstration.sign.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              clinicalType === "sign" ? styles.active : ""
                            }`}
                            onClick={() => setClinicalType("sign")}
                          >
                            علائم (sign)
                          </div>
                        ) : null}

                        {isStringArray(disease.clinical_demonstration.symptom) && disease.clinical_demonstration.symptom.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              clinicalType === "symptom" ? styles.active : ""
                            }`}
                            onClick={() => setClinicalType("symptom")}
                          >
                            نشانه‌ها (symptom)
                          </div>
                        ) : null}
                      </div>

                      <div className={styles.switchContent}>
                        {clinicalType === "sign" &&
                          isStringArray(disease.clinical_demonstration.sign) &&
                          disease.clinical_demonstration.sign.map(
                            (item, index) => <p key={index}>{item}</p>
                          )}

                        {clinicalType === "symptom" &&
                          isStringArray(disease.clinical_demonstration.symptom) &&
                          disease.clinical_demonstration.symptom.map(
                            (item, index) => <p key={index}>{item}</p>
                          )}

                        {getImagesByUseType("clinical", clinicalType).length >
                          0 && (
                          <div className={styles.files}>
                            {getImagesByUseType("clinical", clinicalType).map(
                              (f) => (
                                <div key={f.id} className={styles.fileImageWrapper}>
                                  <img
                                    src={f.file}
                                    alt="file"
                                    className={styles.fileImage}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : content === "GALLERY_COMPONENT" ? (
                  <div className={styles.galleryGrid}>
                    {galleryImages.map((file) => (
                      <div key={file.id} className={styles.galleryItem}>
                        <img
                          src={file.file}
                          alt="gallery image"
                          className={styles.galleryImage}
                        />
                      </div>
                    ))}
                  </div>
                ) : typeof content === "string" ? (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    {getImagesByUseType(key).length > 0 && (
                      <div className={styles.files}>
                        {getImagesByUseType(key).map((f) => (
                          <div key={f.id} className={styles.fileImageWrapper}>
                            <img
                              src={f.file}
                              alt="file"
                              className={styles.fileImage}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {getImagesByUseType(key).length > 0 && (
                      <div className={styles.files}>
                        {getImagesByUseType(key).map((f) => (
                          <Image
                            key={f.id}
                            src={f.file}
                            alt="file"
                            width={120}
                            height={120}
                            className={styles.fileImage}
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
        ))}
      </div>
    </div>
  );
}