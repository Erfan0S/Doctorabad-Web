"use client";
import React from "react";
import QuestionBankFilter from "@/components/questionBank/filter";
import Providers from "@/providers/providers";

// TODO: remove Providers

function QuestionBankPage() {
  return (
    <Providers>
      <div>
        <QuestionBankFilter />
      </div>
    </Providers>
  );
}

export default QuestionBankPage;
