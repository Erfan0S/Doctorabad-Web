import CategoryListPage from "@/pagesComponents/CategoryListPage";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const CategoryPage = ({ params }: Props) => {
  return <CategoryListPage id={+params.id} />;
};

export default CategoryPage;
