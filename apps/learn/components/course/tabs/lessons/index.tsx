import { FC, useState } from "react";
import { Section } from "@/types/courses";
import Play from "@/assets/svg/play";
import styles from "./Lessons.module.scss";
import formatDuration from "@/utils/formatDuration";
import clsx from "clsx";

interface CourseContentProps {
  sections: Section[];
}

const CourseContent: FC<CourseContentProps> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <div
          key={section.id}
          className={clsx(styles.section, {
            [styles.sectionOpen]: openSections.has(section.id),
          })}
        >
          <h2
            className={styles.sectionTitle}
            onClick={() => toggleSection(section.id)}
          >
            {section.title}
          </h2>
          <div
            className={clsx(styles.contentCollapse, {
              [styles.open]: openSections.has(section.id),
            })}
          >
            {section.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={clsx(styles.chapter, {
                  [styles.chapterOpen]: openSections.has(chapter.id),
                })}
              >
                <h3
                  className={styles.chapterTitle}
                  onClick={() => toggleSection(chapter.id)}
                >
                  {chapter.title}
                </h3>
                <div
                  className={clsx(styles.contentCollapse, {
                    [styles.open]: openSections.has(chapter.id),
                  })}
                >
                  <ul className={styles.lessonList}>
                    {chapter.lessons.map((lesson) => (
                      <li key={lesson.id} className={styles.lesson}>
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
