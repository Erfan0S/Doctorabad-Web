import React from "react";

export function generateQuestionId(id: string, lessonId: string) {
  return `question-${id}-${lessonId}`;
}
