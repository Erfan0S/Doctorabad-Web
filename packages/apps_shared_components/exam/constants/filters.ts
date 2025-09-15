import { SharedFilters, filterPages } from "../types/filters";

// TODO: duplicated code, need to be refactored in exam

export function filtersNames(page: filterPages) {
  const t = Object.entries(SharedFilters).reduce((acc, [key, value]) => {
    return { ...acc, [key]: `${value}-${page}` };
  }, {}) as Record<keyof typeof SharedFilters, string>;
  return t;
}

export const makerFilters = filtersNames("maker");
export const questionBankFilters = filtersNames("questionBank");
export const examsFilters = filtersNames("exams");

export const SingleLessonFilter = "lesson";
