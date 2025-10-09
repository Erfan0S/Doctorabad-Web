import MakeInputs from "@/components/questionBank/makeExam/inputs";
import { PersistQueryProvider } from "@repo/shared_modules";
import React from "react";

function MakeExamPage() {
  return (
    <PersistQueryProvider>
      <div className="container">
        <MakeInputs />
      </div>
    </PersistQueryProvider>
  );
}

export default MakeExamPage;
