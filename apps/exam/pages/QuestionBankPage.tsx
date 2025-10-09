"use client";
import React from "react";
import QuestionBankFilter from "@/components/questionBank/questionBankFilter";
import Providers from "@/providers/providers";
import { PersistQueryProvider } from "@repo/shared_modules";
import { DiscountPlans } from "@repo/apps_shared_components/exam";

// TODO: remove Providers

function QuestionBankPage() {
  return (
    <PersistQueryProvider>
      <div>
        <QuestionBankFilter />
        <DiscountPlans />
      </div>
    </PersistQueryProvider>
  );
}

export default QuestionBankPage;
