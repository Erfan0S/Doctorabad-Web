import CategoryListPage from "@/pagesComponents/CategoryListPage";
import React from "react";

type Props = {
  params: {
    id: string;
    name: string;
  };
};

const CategoryPage = ({ params }: Props) => {
  const decodedName = decodeURIComponent(params.name);
  return <CategoryListPage id={+params.id} name={decodedName} />;
};

export default CategoryPage;
