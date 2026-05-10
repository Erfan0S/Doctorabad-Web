import { api } from "@/api/Api";
import ArchiveFilters from "./archive";

const ArchiveFiltersContainer = async () => {
  const categories = await api.getCategoriesList();
  const providers = await api.getProviders();
  const productTypes = await api.getProductTypes();
  const priceRange = await api.getProductPriceRange();
  const fields = await api.getFields(5);

  return (
    <ArchiveFilters
      categories={categories.data}
      providers={providers.data.data}
      productTypes={productTypes.data.data}
      priceRange={priceRange.data.data}
      fields={fields.data.data}
    />
  );
};

export default ArchiveFiltersContainer;
