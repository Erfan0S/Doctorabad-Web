import React from 'react';

const SKELETON = "bg-[#d1d1d1] rounded-xl";

const ProductPlaceHolder = () => {
  return (
    <div className="bg-[#efefef] rounded-3xl p-3 shadow-[0_5px_15px_rgba(0,0,0,0.15)] min-h-[397px] flex flex-col justify-between">
      <div className={`${SKELETON} aspect-square mb-3 max-h-[200px]`} />
      <div className="w-full flex-1 flex flex-col justify-between mb-[10px] items-center">
        <div className={`${SKELETON} w-full h-[30px]`} />
        <div className={`${SKELETON} w-full max-w-[150px] h-[30px]`} />
      </div>
      <div className="flex items-center">
        <div className={`${SKELETON} h-[45px] flex-1 me-[10px]`} />
        <div className={`${SKELETON} flex-[0_0_45px] w-[45px] h-[45px] p-0`} />
      </div>
    </div>
  );
};

export default ProductPlaceHolder;
