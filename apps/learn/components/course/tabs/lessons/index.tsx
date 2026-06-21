"use client";
import { FC, useContext, useEffect, useState } from "react";
import { Lesson } from "@/types/courses";
import Play from "@/assets/svg/play";
import styles from "./Lessons.module.scss";
import formatDuration from "@/utils/formatDuration";
import clsx from "clsx";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { LessonVideoContext } from "@/context/LessonVideoContext";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { toast } from "react-toastify";
import { CourseContentProps } from "../tabs-data";

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
    <div className={styles.container}>
      {sections.map((section) => (
        <div
          key={section.id}
          className={clsx(styles.section, {
            [styles.sectionOpen]: !closeSections.has(section.id),
            [styles.emptySection]: !isSectionTitleValid(section.title),
          })}
        >
          <h2
            className={styles.sectionTitle}
            onClick={() => toggleSection(section.id)}
          >
            {isSectionTitleValid(section.title) && section.title}
          </h2>
          <div
            className={clsx(styles.contentCollapse, {
              [styles.open]: !closeSections.has(section.id),
            })}
          >
            {section.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={clsx(styles.chapter, {
                  [styles.chapterOpen]: !closeSections.has(chapter.id),
                  [styles.emptySection]: !isSectionTitleValid(chapter.title),
                })}
              >
                <h2
                  className={styles.chapterTitle}
                  onClick={() => toggleSection(chapter.id)}
                >
                  {isSectionTitleValid(chapter.title) && chapter.title}
                </h2>
                <div
                  className={clsx(styles.contentCollapse, {
                    [styles.open]: !closeSections.has(chapter.id),
                  })}
                >
                  <ul className={styles.lessonList}>
                    {chapter.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={styles.lesson}
                        onClick={() => onLessonClick(lesson)}
                      >
                        <span className={styles.lessonTitle}>
                          {lesson.title}
                        </span>
                        <span className={styles.lessonDuration}>
                          {formatDuration(lesson.duration)}
                        </span>
                        <Play className={styles.playIcon} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
