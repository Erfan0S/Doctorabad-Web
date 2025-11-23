"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./DiseaseDetails.module.scss";
import { clinicApi } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";
import InteractionSection from "./InteractionSection/InteractionSection";
import DiseaseDetailsSkeleton from "@/components/Skeletons/DiseaseDetailsSkeleton/DiseaseDetailsSkeleton";
import { div } from "framer-motion/client";

export default function DiseaseDetailsPage() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [introductionType, setIntroductionType] = useState<string>("preface");
  const [treatmentType, setTreatmentType] = useState<string>("plan");
  const [clinicalType, setClinicalType] = useState<"sign" | "symptom">("sign");

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
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((section) => section !== key)
        : [...prev, key]
    );
  };

  // Set types automatically when data is loaded
  useEffect(() => {
    if (data) {
      // Set introductionType
      if (data.introduction) {
        if (data.introduction.preface?.length) {
          setIntroductionType("preface");
        } else if (data.introduction.definition?.length) {
          setIntroductionType("definition");
        } else if (data.introduction.type?.length) {
          setIntroductionType("type");
        }
      }

      // Set treatmentType
      if (data.treatment_description) {
        if (data.treatment_description.plan?.length) {
          setTreatmentType("plan");
        } else if (data.treatment_description.prescription?.length) {
          setTreatmentType("prescription");
        } else if (data.treatment_description.order?.length) {
          setTreatmentType("order");
        }
      }

      // Set clinicalType
      if (data.clinical_demonstration) {
        if (data.clinical_demonstration.sign?.length) {
          setClinicalType("sign");
        } else if (data.clinical_demonstration.symptom?.length) {
          setClinicalType("symptom");
        }
      }
    }
  }, [data]);

  if (isLoading) return <DiseaseDetailsSkeleton />;
  if (error || !data)
    return <div className={styles.error}>خطا در دریافت اطلاعات</div>;

  const disease = data;

  // Helper function to get images based on use_type
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

  const allSections = [
    {
      key: "introduction",
      label: "معرفی",
      content:
        disease.introduction?.type?.length ||
        disease.introduction?.preface?.length ||
        disease.introduction?.definition?.length
          ? "INTRODUCTION_COMPONENT"
          : null,
      // content: (() => {
      //   const intro = disease.introduction;
      //   if (!intro) return null;

      //   const parts = [];

      //   if (intro.type?.length)
      //     parts.push(`<strong>انواع:</strong><br/>${intro.type.join("<br/>")}`);

      //   if (intro.preface?.length)
      //     parts.push(`<strong>مقدمه:</strong><br/>${intro.preface.join("<br/>")}`);

      //   if (intro.definition?.length)
      //     parts.push(`<strong>تعریف:</strong><br/>${intro.definition.join("<br/>")}`);

      //   return parts.length ? parts.join("<br/><br/>") : null;
      // })(),
    },
    {
      key: "treatment",
      label: "درمان",
      content:
        disease.treatment_description?.plan?.length ||
        disease.treatment_description?.order?.length ||
        disease.treatment_description?.prescription?.length ||
        disease.treatment?.length
          ? "TREATMENT_COMPONENT"
          : null,
      // content: (() => {
      //   const desc = disease.treatment_description;

      //   const parts = [];

      //   if (desc?.plan?.length)
      //     parts.push(`<strong>برنامه درمان:</strong><br/>${desc.plan.join("<br/>")}`);

      //   if (desc?.order?.length)
      //     parts.push(`<strong>اوردر:</strong><br/>${desc.order.join("<br/>")}`);

      //   if (desc?.prescription?.length)
      //     parts.push(`<strong>نسخه:</strong><br/>${desc.prescription.join("<br/>")}`);

      //   if (disease.treatment?.length)
      //     parts.push(
      //       `<strong>داروها:</strong><br/>${disease.treatment
      //         .map((t) => `• ${t.title_fa}`)
      //         .join("<br/>")}`
      //     );

      //   return parts.length ? parts.join("<br/><br/>") : null;
      // })(),
    },

    {
      key: "epidemiology",
      label: "اپیدمیولوژی",
      content: disease.epidemiology,
    },
    {
      key: "physiopathology",
      label: "فیزیوپاتولوژی و اتیولوژی",
      content: disease.physiopathology,
    },
    {
      key: "risk_factor",
      label: "(Risk Factors)عوامل خطر",
      content: disease.risk_factor?.length
        ? disease.risk_factor.map((r) => `✓ ${r}`).join("<br/>")
        : null,
    },
    {
      key: "clinical",
      label: "تظاهرات بالینی",
      content:
        disease.clinical_demonstration?.sign?.length ||
        disease.clinical_demonstration?.symptom?.length
          ? "CLINICAL_COMPONENT"
          : null,
      // content: (() => {
      //   const c = disease.clinical_demonstration;
      //   if (!c) return null;

      //   const parts = [];

      //   if (c.sign?.length)
      //     parts.push(`<strong>علائم:</strong><br/>${c.sign.join("<br/>")}`);

      //   if (c.symptom?.length)
      //     parts.push(
      //       `<strong>نشانه‌ها:</strong><br/>${c.symptom.join("<br/>")}`
      //     );

      //   return parts.length ? parts.join("<br/><br/>") : null;
      // })(),
    },
    {
      key: "physical_exam",
      label: "معاینات فیزیکی",
      content: disease.physical_exam,
    },
    {
      key: "paraclinic",
      label: "یافته‌های پاراکلینیکی",
      content: disease.paraclinic_info?.length
        ? disease.paraclinic_info.map((p) => `✓ ${p}`).join("<br/>")
        : null,
    },
    {
      key: "differential",
      label: "تشخیص افتراقی",
      content: (() => {
        if (!disease.differential_diagnosis?.length) return null;
        return disease.differential_diagnosis
          .map((d) => `• ${d.title_fa}`)
          .join("<br/>");
      })(),
    },

    {
      key: "prognosis",
      label: "پیش‌آگهی",
      content: disease.prognosis,
    },
    {
      key: "side_effect",
      label: "عوارض",
      content: disease.side_effect,
    },

    {
      key: "diagnosis",
      label: "تشخیص",
      content: disease.diagnosis,
    },
    {
      key: "prevention",
      label: "پیشگیری",
      content: disease.prevention,
    },
    {
      key: "complementary",
      label: "طب مکمل",
      content: disease.complementary_medicine,
    },
    {
      key: "point",
      label: "نکات",
      content: disease.point?.length
        ? disease.point.map((p) => `✓ ${p}`).join("<br/>")
        : null,
    },
  ];

  const availableSections = allSections.filter((section) => {
    if (section.content === null) return false;
    if (typeof section.content === "string") {
      return section.content.trim() !== "";
    }
    return true;
  });

  return (
    <div className={styles.container}>
      {/* --- Header --- */}
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

      {/* --- Accordion sections --- */}
      <div className={styles.sections}>
        {availableSections.map(({ key, label, content }) => (
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

            {openSections.includes(key) && (
              <div className={styles.sectionContent}>
                {content === "INTRODUCTION_COMPONENT" ? (
                  <div className={styles.directionContainer}>
                    <div className={styles.directionTabs}>
                      {disease.introduction?.preface?.length ? (
                        <div
                          className={`${styles.directionTab} ${
                            introductionType === "preface" ? styles.active : ""
                          }`}
                          onClick={() => setIntroductionType("preface")}
                        >
                          مقدمه
                        </div>
                      ) : null}

                      {disease.introduction?.definition?.length ? (
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

                      {disease.introduction?.type?.length ? (
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
                        disease.introduction?.type?.map((item, index) => (
                          <p key={index}>✓ {item}</p>
                        ))}

                      {introductionType === "preface" &&
                        disease.introduction?.preface?.map((item, index) => (
                          <p key={index}>✓ {item}</p>
                        ))}

                      {introductionType === "definition" &&
                        disease.introduction?.definition?.map((item, index) => (
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
                              <div className={styles.fileImageWrapper}>
                                <img
                                  key={f.id}
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
                ) : content === "TREATMENT_COMPONENT" ? (
                  <>
                    {/* Render images for treatment section */}

                    <div className={styles.directionContainer}>
                      <div className={styles.directionTabs}>
                        {disease.treatment_description?.plan?.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              treatmentType === "plan" ? styles.active : ""
                            }`}
                            onClick={() => setTreatmentType("plan")}
                          >
                            برنامه
                          </div>
                        ) : null}

                        {disease.treatment_description?.prescription?.length ? (
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
                              {disease.treatment_description?.order?.length
                                ? ""
                                : "و اوردر "}
                            </>
                          </div>
                        ) : null}

                        {disease.treatment_description?.order?.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              treatmentType === "order" ? styles.active : ""
                            }`}
                            onClick={() => setTreatmentType("order")}
                          >
                            <>
                              {disease.treatment_description?.prescription
                                ?.length
                                ? ""
                                : "نسخه و "}
                            </>
                            اوردر
                          </div>
                        ) : null}
                      </div>

                      <div className={styles.switchContent}>
                        {treatmentType === "plan" &&
                          disease.treatment_description?.plan?.map(
                            (item, index) => <p key={index}>✓ {item}</p>
                          )}

                        {treatmentType === "order" &&
                          disease.treatment_description?.order?.map(
                            (item, index) => <p key={index}>✓ {item}</p>
                          )}

                        {treatmentType === "prescription" &&
                          disease.treatment_description?.prescription?.map(
                            (item, index) => (
                              <p
                                className={styles.prescriptionItem}
                                key={index}
                              >
                                ✓ {item}
                              </p>
                            )
                          )}
                        {getImagesByUseType("treatment", treatmentType).length >
                          0 && (
                          <div className={styles.files}>
                            {getImagesByUseType("treatment", treatmentType).map(
                              (f) => (
                                <div className={styles.fileImageWrapper}>
                                  <img
                                    key={f.id}
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
                ) : content === "CLINICAL_COMPONENT" ? (
                  <>
                    {/* Render images for clinical section */}

                    <div className={styles.directionContainer}>
                      <div className={styles.directionTabs}>
                        {disease.clinical_demonstration?.sign?.length ? (
                          <div
                            className={`${styles.directionTab} ${
                              clinicalType === "sign" ? styles.active : ""
                            }`}
                            onClick={() => setClinicalType("sign")}
                          >
                            علائم (sign)
                          </div>
                        ) : null}

                        {disease.clinical_demonstration?.symptom?.length ? (
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
                          disease.clinical_demonstration?.sign?.map(
                            (item, index) => <p key={index}>{item}</p>
                          )}

                        {clinicalType === "symptom" &&
                          disease.clinical_demonstration?.symptom?.map(
                            (item, index) => <p key={index}>{item}</p>
                          )}

                        {getImagesByUseType("clinical", clinicalType).length >
                          0 && (
                          <div className={styles.files}>
                            {getImagesByUseType("clinical", clinicalType).map(
                              (f) => (
                                <div className={styles.fileImageWrapper}>
                                  <img
                                    key={f.id}
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
                ) : typeof content === "string" ? (
                  <>
                    {/* Render images for other sections */}

                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    {getImagesByUseType(key).length > 0 && (
                      <div className={styles.files}>
                        {getImagesByUseType(key).map((f) => (
                          <div className={styles.fileImageWrapper}>
                            <img
                              key={f.id}
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
                    {/* Render images for other sections */}
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
