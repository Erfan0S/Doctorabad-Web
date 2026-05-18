"use client";

import React from "react";
import { PageHeader } from "../../../headers";
import styles from "./ProPage.module.scss";
import { Apps } from "@repo/core/types/general";

const ProPage = () => {
  return (
    <div className={styles.proPageContainer}>
      <PageHeader title="دکتر پرو" app={Apps.BASE} />
      
      <div className={styles.content}>
        <h1>به بخش دکتر پرو خوش آمدید</h1>
        <p>
          این یک صفحه دمو برای بخش دکتر پرو است. 
          شما می‌توانید محتوای اختصاصی، ابزارهای پیشرفته و خدمات ویژه دکتر پرو را در این بخش پیاده‌سازی کنید.
        </p>
      </div>
    </div>
  );
};

export default ProPage;
