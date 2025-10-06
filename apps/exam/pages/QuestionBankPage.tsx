"use client";
import React from "react";
import QuestionBankFilter from "@/components/questionBank/questionBankFilter";
import Providers from "@/providers/providers";
import AppQueryClientProvider from "@/providers/queryClientProvider";
import { DiscountPlans } from "@repo/apps_shared_components/exam";

// TODO: remove Providers

function QuestionBankPage() {
  return (
    <AppQueryClientProvider>
      <div>
        <QuestionBankFilter />
        <DiscountPlans />
      </div>
    </AppQueryClientProvider>
  );
}

export default QuestionBankPage;
