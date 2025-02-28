import HomeHeader from "@/components/Header/HomeHeader";
import MainPage from "@/components/LearnHome";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import React from "react";

const HomeLearn = () => {
  return (
    <div>
      <HomeHeader />
      <MainPage />
    </div>
  );
};

export default HomeLearn;
