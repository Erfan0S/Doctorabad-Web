import React from "react";

export default function MainSliderPlaceHolder() {
  return (
    <div className="container">
      <div className="mb-[15px] mt-[5px] h-[400px] max-h-[40vw] w-full rounded-[20px] bg-[#e6e6e6] shadow-card">
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
