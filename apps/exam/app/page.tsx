import HomeHeader from "@/components/headers/homeHeader";
import { Apps } from "@repo/core/types/general";
import { Button } from "@repo/shared_modules/components";
import React from "react";

const HomeExam = () => {
  return (
    <div>
      <HomeHeader />
      <h1>Exam</h1>
      <Button app={Apps.EXAM} disabled styleType="outline">
        تست
      </Button>
    </div>
  );
};

export default HomeExam;
