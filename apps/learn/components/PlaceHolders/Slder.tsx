import React from "react";
import style from "./PlaceHolder.module.scss";

export default function MainSliderPlaceHolder() {
  return (
    <div className="container">
      <div className={style.mainSlider}>
        <div className="">
          <div className="">
            {[1, 2, 3].map((i) => (
              <div key={i} className="" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
