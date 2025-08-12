import React from "react";
import { api } from "../../../api/Api";

const SidePanelFavoritesExam: React.FC = () => {
  api.getExamFavoriteList().then((res) => console.log(res));

  return <div>هیچ سوالی نیست!</div>;
};

export default SidePanelFavoritesExam;
