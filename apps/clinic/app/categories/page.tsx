import CategoriesPage from "@/components/CategoriesPage/categoriesPage";
import { Suspense } from "react";

export default async function CategoriesPageRoute() {
  return (
    <Suspense>
      <CategoriesPage />
    </Suspense>
  );
}
