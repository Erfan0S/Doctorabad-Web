"use client";

import React from "react";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import ServiceCard from "./ServiceCard";
import myInsurance from "@/assets/img/bigBanner/icons/DA-01 (1).png";
import myPharmacy from "@/assets/img/bigBanner/icons/DA-03 (1).png";
import myClinic from "@/assets/img/bigBanner/icons/DA-04 (1).png";

const COMING_SOON_MESSAGE = "این بخش به زودی در دسترس قرار می‌گیره";

const ServiceShortcuts = () => {
  const openInsuranceComingSoonModal = () => {
    modalActions.addModal(ModalTypes.COMING_SOON, {
      message: COMING_SOON_MESSAGE,
    });
  };

  const services = [
    {
      id: 3,
      title: "کلینیک‌من",
      enTitle: "MyClinic",
      icon: myClinic,
      href: baseUrls[Apps.CLINIC],
    },
    {
      id: 2,
      title: "داروخانه‌من",
      enTitle: "MyPharmacy",
      icon: myPharmacy,
      href: baseUrls[Apps.PHARMACY],
    },
    {
      id: 1,
      title: "بیمه‌من",
      enTitle: "MyInsurance",
      icon: myInsurance,
      href: baseUrls[Apps.INSURANCE],
      // onClick: openInsuranceComingSoonModal,
    },
  ];

  return (
    <section style={{ paddingBottom: 15 }} className="container">
      <div className="mx-auto flex justify-center gap-5 max-[992px]:gap-4 max-[768px]:items-stretch max-[768px]:gap-3">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceShortcuts;
