import ProviderPage from "@/pagesComponents/ProviderPage";
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
