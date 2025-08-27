"use client";
import { api } from "@/api/Api";
import React from "react";
import QuestionItem from "./questionItem";

function Questions() {
  console.log("test");
  api
    .getQuestions({ field: 1 })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return (
    <div className="container">
      <QuestionItem />
    </div>
  );
}

export default Questions;
