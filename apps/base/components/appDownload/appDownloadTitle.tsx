import React from 'react';
import style from './AppDownload.module.scss';

type Props = {
  className?: string;
};

const AppDownloadTitle = ({ className }: Props) => {
  return (
    <div className={style.downloadTitle + ' ' + className}>
      <h2>اپلیکیشن دکترآباد برای تمامی دستگاه‌ها</h2>
      <p>
        اپلیکیشن دکترآباد بر بستر اندروید، ios و ویندوز نصب کنید <br />و با ترافیک نیم بها از دنیای علوم پزشکی
        لذت ببرید!
      </p>
    </div>
  );
};

export default AppDownloadTitle;
