import React from "react";
import style from "./style.module.scss";

type Props = {
  primaryMassage: string | React.ReactNode;
  secondaryMassage?: string;
};

function FIlterNotFound({ primaryMassage, secondaryMassage }: Props) {
  return (
    <div className={`${style.filterNotFound} container`}>
      <p>{primaryMassage}</p>
      {!!secondaryMassage && <p>{secondaryMassage}</p>}
    </div>
  );
}

export default FIlterNotFound;
