import React from "react";

type Props = {
  primaryMassage: string | React.ReactNode;
  secondaryMassage?: string;
};

function FIlterNotFound({ primaryMassage, secondaryMassage }: Props) {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-[10px] text-center text-[1.2rem] text-[rgb(0,0,0,0.6)] container">
      <p>{primaryMassage}</p>
      {!!secondaryMassage && <p>{secondaryMassage}</p>}
    </div>
  );
}

export default FIlterNotFound;
