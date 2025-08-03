"use client";
import React from "react";
import QuestionBankFilter from "@/components/questionBank/filter";
import Providers from "@/providers/providers";
import DiscountPlans from "@/components/discountPlans";

// TODO: remove Providers

function QuestionBankPage() {
  return (
    <div>
      <QuestionBankFilter />
      <DiscountPlans />
    </div>
  );
}

export default QuestionBankPage;
