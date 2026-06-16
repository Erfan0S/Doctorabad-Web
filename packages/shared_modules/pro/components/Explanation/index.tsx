import { ExplanationItem } from "@repo/core/types/dr-pro";
import styles from "./Explanation.module.scss";
import Image from "next/image";
const Explanation = ({ data }: { data?: ExplanationItem[] }) => {
  return (
    <div className={styles.explanationContainer}>
      {data?.map((item, index) => (
        <div className={styles.itemContainer}>
          <div className={styles.rightSide}>
            <div className={styles.pic}>
              <Image
                src={item.picture}
                sizes="100vw"
                alt={item.title}
                className={styles.pic}
                width={50}
                height={50}
              />
            <p className={styles.title} key={index}>
              {item.title}
            </p>
            </div>
          </div>
          <h3 className={styles.description}>{item.description}</h3>
        </div>
      ))}
    </div>
  );
};

export default Explanation;
