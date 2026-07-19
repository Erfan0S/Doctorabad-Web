import React from 'react';

type Props = {
  className?: string;
};

const AppDownloadTitle = ({ className }: Props) => {
  return (
    <div className={'flex w-full flex-col items-center justify-center px-[55px] max-[1750px]:px-5 max-[1550px]:px-[10px] max-[750px]:px-0' + ' ' + className}>
      <h2 className="w-full text-center text-[32px] font-black max-[1750px]:text-[25px] max-[1550px]:text-[20px] max-[750px]:text-[25px] max-[550px]:text-[21px]">اپلیکیشن دکترآباد برای تمامی دستگاه‌ها</h2>
      <p className="text-center text-[23px] font-bold max-[1750px]:text-[17px] max-[1550px]:text-[13px] max-[750px]:text-[17px] max-[550px]:text-[13px]">
        اپلیکیشن دکترآباد بر بستر اندروید، ios و ویندوز نصب کنید <br />و با ترافیک نیم بها از دنیای علوم پزشکی
        لذت ببرید!
      </p>
    </div>
  );
};

export default AppDownloadTitle;
