"use client";
import React from "react";
import QuestionBankFilter from "@/components/questionBank/filter";
import Providers from "@/providers/providers";
import DiscountPlans from "@/components/discountPlans";
import AppQueryClientProvider from "@/providers/queryClientProvider";

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
