import CollectionListPage from "@/pagesComponents/CollectionListPage";
import React from "react";

type Props = {
  params: {
    id: string;
    name: string;
  };
};

const CollectionPage = ({ params }: Props) => {
  const decodedName = decodeURIComponent(params.name);
  return <CollectionListPage id={+params.id} name={decodedName} />;
};

export default CollectionPage;
