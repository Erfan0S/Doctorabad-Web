import React from "react";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import ServiceCard from "./ServiceCard";
import styles from "./ServiceShortcuts.module.scss";
import myInsurance from '@/assets/img/bigBanner/icons/my_insurance.png';
import myPharmacy from '@/assets/img/bigBanner/icons/my_pharmacy.png';
import myClinic from '@/assets/img/bigBanner/icons/my_clinic.png';


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
      href: baseUrls[Apps.TOOLS],
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceShortcuts;
