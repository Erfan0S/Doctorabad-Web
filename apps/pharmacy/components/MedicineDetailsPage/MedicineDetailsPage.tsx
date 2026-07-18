"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { pharmacyApi } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import PillsIcon from "@/assets/svg/pillsIcon";
import InteractionSection from "./InteractionSection/InteractionSection";
import MedicineDetailsSkeleton from "@/components/Skeletons/MedicineDetailsSkeleton/MedicineDetailsSkeleton";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { canTrackMedicineView } from "@/utils/medicineViewTracking";
import { useMedicineView } from "@/hooks/useMedicineView";
import sanitize from "@repo/core/utils/sanitize";

const medallionCls =
  "absolute bottom-[calc(var(--img-size)/-2)] right-[var(--img-offset-right)] h-[var(--img-size)] w-[var(--img-size)] rounded-[23px] border-4 border-solid border-white bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]";

const directionTabCls =
  "flex h-[70px] max-h-[70px] flex-1 cursor-pointer items-center justify-center border-b-[3px] p-2 text-center text-sm font-semibold transition-all duration-300 [border-bottom-style:solid] hover:text-green-base";
const directionTabActiveCls =
  "border-b-[#4fcc4c] bg-[rgba(76,175,80,0.05)] text-green-base";
const directionTabIdleCls = "border-b-transparent text-[#666]";

const shapeTableCls =
  "w-full border-collapse border border-solid border-[#666] [&_th]:border [&_th]:border-solid [&_th]:border-[#666] [&_th]:px-[10px] [&_th]:py-[14px] [&_th]:text-center [&_th]:text-[15px] [&_th]:font-bold [&_th]:text-white [&_td]:border [&_td]:border-solid [&_td]:border-[#666] [&_td]:bg-white [&_td]:px-[10px] [&_td]:py-[14px] [&_td]:text-center [&_td]:text-[15px] [&_td]:font-semibold [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-[2] [&_thead_th]:bg-[#52cc4b]";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    "adult" | "child" | "elder"
  >("adult");
  const hasRecordedViewRef = useRef(false);

  const { recordMedicineView } = useMedicineView();

  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine-details", id],
    queryFn: async () => {
      if (!id) throw new Error("No id");
      const res = await pharmacyApi.getMedicineDetails(Number(id));
      return res.data.data;
    },
    enabled: !!id,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((section) => section !== key)
        : [...prev, key],
    );
  };

  // Reset ref when medicine ID changes
  useEffect(() => {
    hasRecordedViewRef.current = false;
  }, [id]);

  // Track medicine view when sections are opened (once per day per medicine)
  useEffect(() => {
    if (!id || !data || openSections.length === 0) return;

    const medicineId = Number(id);
    if (!medicineId || isNaN(medicineId)) return;

    // Check if we've already tried to record this view in this session
    if (hasRecordedViewRef.current) return;

    // Check if user is logged in and hasn't viewed this medicine today
    if (canTrackMedicineView(medicineId, isUserLoggedIn)) {
      hasRecordedViewRef.current = true;
      recordMedicineView(medicineId);
    }
  }, [id, data, openSections, recordMedicineView]);

  function buildCategoryTree(categories: any[]) {
    const map = new Map();
    categories.forEach((c) => map.set(c.id, { ...c, children: [] }));

    let root = null;

    categories.forEach((c) => {
      if (c.parent === null) {
        root = map.get(c.id);
      } else {
        map.get(c.parent)?.children.push(map.get(c.id));
      }
    });

    return root;
  }

  function renderCategoryTree(node: any, depth = 0) {
    if (!node) return "";

    const indent = "&ensp;".repeat(depth);
    const bullet = "> ";

    const line = `${indent}${node.parent ? bullet : ""}${node.title}<br/>`;

    let html = line;

    node.children?.forEach((child: any) => {
      html += renderCategoryTree(child, depth + 1);
    });

    return html;
  }

  if (isLoading) return <MedicineDetailsSkeleton />;
  if (error || !data) return <div>خطا در دریافت اطلاعات</div>;

  const medicine = data;
  type MedicineFile = {
    id: number;
    file: string;
    use_type: number;
  };

  const getImagesByUseType = (sectionKey: string): MedicineFile[] => {
    if (!medicine.files?.length) return [];

    const useTypeMap: Record<string, number[]> = {
      mechanism: [3],
      use_case: [4],
      gallery: [5],
    };

    const useTypes = useTypeMap[sectionKey] ?? [];
    if (!useTypes.length) return [];

    return medicine.files.filter((file: MedicineFile) =>
      useTypes.includes(file.use_type),
    );
  };

  const galleryImages = getImagesByUseType("gallery");

  const hasNonNullShapeCoding = (coding: any) => {
    if (!coding || typeof coding !== "object") return false;
    return Object.values(coding).some((v) => {
      if (v === null || v === undefined) return false;
      if (typeof v === "string") return v.trim() !== "";
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "object") return Object.keys(v).length > 0;
      return true;
    });
  };

  const allSections = [
    {
      key: "category",
      label: "دسته‌بندی",
      content: (() => {
        if (!medicine.categories?.length) return null;

        const tree = buildCategoryTree(medicine.categories);
        return renderCategoryTree(tree);
      })(),
    },

    {
      key: "mechanism",
      label: "مکانیسم اثر",
      content: medicine.effect_mechanism || null,
    },
    {
      key: "brands",
      label: "اسامی‌تجاری",
      content:
        medicine.brands?.map((b: string) => `✓ ${b}`).join("<br/>") || null,
    },
    {
      key: "shape",
      label: "اشکال دارویی",
      content: (
        <>
          {medicine.shapes?.length ? (
            <div
              dangerouslySetInnerHTML={{
                __html: medicine.shapes
                  .map((s: string) => `✓ ${s}`)
                  .join("<br/>"),
              }}
            />
          ) : null}

          {hasNonNullShapeCoding(medicine.shape_coding) ? (
            <div className="mt-3 w-full overflow-x-auto">
              <table className={shapeTableCls}>
                <thead>
                  <tr>
                    <th>اشکال دارویی</th>
                    <th>کد دارو</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(medicine.shape_coding).map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>
                        {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </>
      ),
    },
    {
      key: "use_case",
      label: "موارد مصرف",
      content: medicine.use_case || null,
    },
    {
      key: "direction",
      label: "دستور مصرف",
      content:
        medicine.direction?.adult?.length ||
        medicine.direction?.child?.length ||
        medicine.direction?.elder?.length
          ? "DIRECTION_COMPONENT"
          : null,
    },
    {
      key: "prevention",
      label: "منع مصرف",
      content: medicine.prevention || null,
    },
    {
      key: "pregnant",
      label: "حاملگی و شیردهی",
      content: medicine.pregnant || null,
    },
    {
      key: "side",
      label: "عوارض جانبی",
      content:
        medicine.side_effects?.map((s: string) => `✓ ${s}`).join("<br/>") ||
        null,
    },
    {
      key: "interaction",
      label: "تداخلات دارویی",
      content:
        medicine.interaction_description || medicine.interaction_medicines ? (
          <InteractionSection
            description={medicine.interaction_description}
            medicines={medicine.interaction_medicines}
          />
        ) : null,
    },

    {
      key: "poisoning",
      label: "مسمومیت",
      content:
        medicine.poisoning?.map((p: string) => `✓ ${p}`).join("<br/>") || null,
    },
    {
      key: "points",
      label: "نکات",
      content: medicine.points || null,
    },
    {
      key: "gallery",
      label: "گالری",
      content: galleryImages.length ? "GALLERY_COMPONENT" : null,
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
    <div className="bg-white text-[#222]">
      {/* --- Header --- */}

      <div className="sticky top-[3.5rem] z-[100] bg-green-base pt-4 [--img-size:6.7rem] [--img-offset-right:10px]">
        <div className="relative flex min-h-[3rem] items-end justify-end bg-green-base pl-5 pr-[calc(var(--img-size)_+_var(--img-offset-right)_+_10px)] text-left text-[1rem] font-bold text-white [direction:ltr]">
          {medicine.title_en}
          <div>
            {" "}
            {medicine.picture ? (
              <Image
                src={medicine.picture ? medicine.picture : ""}
                alt={medicine.title_fa}
                width={140}
                height={140}
                className={medallionCls}
              />
            ) : (
              <PillsIcon
                className={`${medallionCls} p-[15px]`}
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
        <div className="flex min-h-[4rem] justify-start bg-white pl-5 pr-[calc(var(--img-size)_+_var(--img-offset-right)_+_10px)] text-right text-[0.9rem] font-bold text-green-base">
          {medicine.title_fa}
        </div>
      </div>

      {/* --- Accordion sections --- */}
      <div className="mx-20 my-4">
        {availableSections.map(({ key, label, content }) => (
          <div key={key} className="mb-[0.6rem]">
            <div
              className="relative flex w-full items-center justify-center rounded-[10px] border-none bg-green-base px-4 py-[0.7rem] text-center text-[0.9rem] font-semibold text-white"
              onClick={() => toggleSection(key)}
            >
              {label}
              <span className="absolute left-4 flex h-full items-center">
                {openSections.includes(key) ? <DownArrow /> : <LeftArrow />}
              </span>
            </div>

            {openSections.includes(key) && (
              <div className="-mx-16 -mt-1 mb-0 rounded-[10px] border border-solid border-[#eee] bg-white px-[0.8rem] py-[0.6rem] text-[0.9rem] leading-[1.6] [direction:rtl]">
                {content === "DIRECTION_COMPONENT" ? (
                  <div className="mt-[10px]">
                    <div className="mb-5 flex w-full items-center justify-between overflow-x-scroll overflow-y-hidden [border-bottom:2px_solid_#e0e0e0]">
                      {medicine.direction?.adult?.length ? (
                        <div
                          className={`${directionTabCls} ${
                            selectedAgeGroup === "adult"
                              ? directionTabActiveCls
                              : directionTabIdleCls
                          }`}
                          onClick={() => setSelectedAgeGroup("adult")}
                        >
                          <>
                            بزرگسالان{" "}
                            {medicine.direction?.elder?.length
                              ? ""
                              : "و سالمندان "}
                          </>
                        </div>
                      ) : null}

                      {medicine.direction?.child?.length ? (
                        <div
                          className={`${directionTabCls} ${
                            selectedAgeGroup === "child"
                              ? directionTabActiveCls
                              : directionTabIdleCls
                          }`}
                          onClick={() => setSelectedAgeGroup("child")}
                        >
                          کودکان
                        </div>
                      ) : null}

                      {medicine.direction?.elder?.length ? (
                        <div
                          className={`${directionTabCls} ${
                            selectedAgeGroup === "elder"
                              ? directionTabActiveCls
                              : directionTabIdleCls
                          }`}
                          onClick={() => setSelectedAgeGroup("elder")}
                        >
                          سالمندان
                        </div>
                      ) : null}
                    </div>

                    <div className="text-justify leading-[1.8] [&_p]:mb-[15px] [&_p:last-child]:mb-0">
                      {selectedAgeGroup === "adult" &&
                        medicine.direction?.adult?.map(
                          (item: string, index: number) => (
                            <p key={index}>{item}</p>
                          ),
                        )}

                      {selectedAgeGroup === "child" &&
                        medicine.direction?.child?.map(
                          (item: string, index: number) => (
                            <p key={index}>{item}</p>
                          ),
                        )}

                      {selectedAgeGroup === "elder" &&
                        medicine.direction?.elder?.map(
                          (item: string, index: number) => (
                            <p key={index}>{item}</p>
                          ),
                        )}
                    </div>
                  </div>
                ) : content === "GALLERY_COMPONENT" ? (
                  <div className="flex flex-col items-center gap-3">
                    {galleryImages.map((file: MedicineFile) => (
                      <div
                        key={file.id}
                        className="w-full max-w-[520px] overflow-hidden rounded-[14px] bg-[#f8f8f8] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                      >
                        <img
                          src={file.file}
                          alt="gallery image"
                          className="block h-auto max-h-[360px] w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : typeof content === "string" ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: sanitize(content) }}
                    />
                    {getImagesByUseType(key).length > 0 && (
                      <div>
                        {getImagesByUseType(key).map((file: MedicineFile) => (
                          <div
                            key={file.id}
                            className="flex w-full max-w-full justify-center rounded-[17px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                          >
                            <img
                              src={file.file}
                              alt="file"
                              className="max-h-[15rem] max-w-full rounded-[17px]"
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
                        {getImagesByUseType(key).map((file: MedicineFile) => (
                          <div
                            key={file.id}
                            className="flex w-full max-w-full justify-center rounded-[17px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                          >
                            <img
                              src={file.file}
                              alt="file"
                              className="max-h-[15rem] max-w-full rounded-[17px]"
                            />
                          </div>
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
