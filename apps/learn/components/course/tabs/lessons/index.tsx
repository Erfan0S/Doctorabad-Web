"use client";
import { FC, useContext, useEffect, useState } from "react";
import { Lesson } from "@/types/courses";
import Play from "@/assets/svg/play";
import formatDuration from "@/utils/formatDuration";
import clsx from "clsx";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { LessonVideoContext } from "@/context/LessonVideoContext";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { toast } from "react-toastify";
import { CourseContentProps } from "../tabs-data";

const titleBase =
  "flex cursor-pointer select-none items-center justify-between rounded-lg hover:text-black";

const CourseContent: FC<CourseContentProps> = ({ course }) => {
  const [closeSections, setCloseSections] = useState<Set<number>>(new Set());
  const { setCurrentLeasson, clearBookmark } = useContext(LessonVideoContext);
  const changeSearchParamsFilter = useChangeSearchParamsFilter();

  const sections = course.sections;

  const isMobileView =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const toggleSection = (sectionId: number) => {
    setCloseSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const isSectionTitleValid = (title: string) =>
    !(title.length <= 0 || title == "" || title == ".");

  const onLessonClick = (lesson: Lesson) => {
    if (!isUserLoggedIn(true)) {
      modalActions.addModal(ModalTypes.REGISTER);
      return;
    }
    if (course.user_has_access && !course.only_watchable_on_app) {
      clearBookmark();
      setCurrentLeasson(lesson);
      changeSearchParamsFilter({ lesson: lesson.id.toString() });
      if (!isMobileView) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else if (!course.user_has_access) {
      toast.error("این دوره را هنوز نخریدی!");
    } else if (course.only_watchable_on_app) {
      modalActions.addModal(ModalTypes.AppOnly);
    }
  };

  useEffect(() => {
    const newSet = new Set<number>();
    sections.forEach((section) => {
      if (!isSectionTitleValid(section.title)) {
        newSet.add(section.id);
      }
      section.chapters.forEach((chapter) => {
        if (!isSectionTitleValid(chapter.title)) {
          newSet.add(chapter.id);
        }
      });
    });
  }, [sections]);

  return (
    <div className="w-full bg-white px-[10px] py-[15px] [direction:rtl] [font-family:var(--font-iran-sans),sans-serif]">
      {sections.map((section) => {
        const isOpen = !closeSections.has(section.id);
        const isValid = isSectionTitleValid(section.title);
        return (
          <div
            key={section.id}
            className={clsx(
              "mb-[7px] cursor-pointer rounded-lg border-b-0 border-l-0 border-t-0 border-[#14a107] last:mb-0",
              isOpen && "rounded-b-none",
              isOpen && isValid && "border-s-2 border-solid",
            )}
          >
            <h2
              className={clsx(
                titleBase,
                "text-[16px] font-semibold text-[#333]",
                isValid
                  ? "border-2 border-solid border-[#14a107] p-3"
                  : "m-0 border-0 p-0",
                isOpen && isValid && "border-s-0",
              )}
              onClick={() => toggleSection(section.id)}
            >
              {isValid && section.title}
            </h2>
            <div
              className={clsx(
                "overflow-hidden",
                isOpen ? "h-auto" : "h-0",
                isOpen && isValid && "ps-[10px]",
              )}
            >
              {section.chapters.map((chapter) => {
                const isChapterOpen = !closeSections.has(chapter.id);
                const isChapterValid = isSectionTitleValid(chapter.title);
                return (
                  <div
                    key={chapter.id}
                    className={clsx(
                      "mb-[7px] cursor-pointer overflow-hidden rounded-lg border-b-0 border-l-0 border-t-0 border-[#1ac70a] first:mt-2 last:mb-0",
                      isChapterOpen && "rounded-b-none",
                      isChapterOpen &&
                        isChapterValid &&
                        "border-s-2 border-solid",
                    )}
                  >
                    <h2
                      className={clsx(
                        titleBase,
                        "bg-[#f2f2f2] text-[14px] font-medium text-[#495057]",
                        isChapterValid
                          ? "mb-2 border-2 border-solid border-[#1ac70a] p-[10px]"
                          : "m-0 border-0 p-0",
                        isChapterOpen && isChapterValid && "border-s-0",
                      )}
                      onClick={() => toggleSection(chapter.id)}
                    >
                      {isChapterValid && chapter.title}
                    </h2>
                    <div
                      className={clsx(
                        "overflow-hidden",
                        isChapterOpen ? "h-auto" : "h-0",
                        isChapterOpen && isChapterValid && "ps-[10px]",
                      )}
                    >
                      <ul className="m-0 list-none overflow-hidden p-0">
                        {chapter.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="mt-[7px] flex cursor-pointer items-center rounded-lg border-2 border-solid border-[#2cc51eb9] bg-white px-[15px] py-[10px]"
                            onClick={() => onLessonClick(lesson)}
                          >
                            <span className="flex-1 text-[13px] text-[#495057]">
                              {lesson.title}
                            </span>
                            <span className="text-[13px] text-[#495057] [direction:ltr]">
                              {formatDuration(lesson.duration)}
                            </span>
                            <Play className="my-0 me-[3px] ms-3 h-5 w-5 min-w-[20px] text-[#6c757d] [direction:ltr]" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseContent;
