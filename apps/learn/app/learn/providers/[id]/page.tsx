import ProviderPage from "@/pages/ProviderPage";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Provider = ({ params }: Props) => {
  return <ProviderPage id={+params.id} />;
};

export default Provider;
