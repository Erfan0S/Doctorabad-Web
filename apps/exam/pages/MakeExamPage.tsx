import MakeInputs from "@/components/questionBank/makeExam/inputs";
import AppQueryClientProvider from "@/providers/queryClientProvider";
import React from "react";

function MakeExamPage() {
  return (
    <AppQueryClientProvider>
      <div className="container">
        <MakeInputs />
      </div>
    </AppQueryClientProvider>
  );
}

export default MakeExamPage;
