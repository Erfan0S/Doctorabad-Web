import React from "react";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import ServiceCard from "./ServiceCard";
import styles from "./ServiceShortcuts.module.scss";
import myInsurance from "@/assets/img/bigBanner/icons/DA-01 (1).png";
import myPharmacy from "@/assets/img/bigBanner/icons/DA-03 (1).png";
import myClinic from "@/assets/img/bigBanner/icons/DA-04 (1).png";

const ServiceShortcuts = () => {
  const services = [
    {
      id: 3,
      title: "کلینیک من",
      enTitle: "MyClinic",
      icon: myClinic,
      href: baseUrls[Apps.CLINIC],
    },
    {
      id: 2,
      title: "داروخانه من",
      enTitle: "MyPharmacy",
      icon: myPharmacy,
      href: baseUrls[Apps.PHARMACY],
    },
    {
      id: 1,
      title: "بیمه من",
      enTitle: "MyInsurance",
      icon: myInsurance,
      href: baseUrls[Apps.INSURANCE],
    },
  ];

  return (
    <section style={{ paddingBottom: 15 }} className="container">
      <div className={styles.wrapper}>
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceShortcuts;
