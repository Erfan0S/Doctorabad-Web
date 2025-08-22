"use client";
import { api } from "@/api/Api";
import React from "react";

function Questions() {
  console.log("test");
  api.getQuestions({ field: 1 }).then((res) => console.log(res));

  return <div>Questions</div>;
}

export default Questions;
