export enum FilterParams {
  Sort = "sort",
  Category = "category",
  Field = "field",
  Grade = "grade",
  OnlyAvailable = "onlyAvailable",
  Provider = "provider",
  ProductType = "product_type",
  MinPrice = "min_price",
  MaxPrice = "max_price",
  SEARCH = "search",
  FestivalId = "festival_id",
}

export const sortByConfigs = [
  { title: "جدیدترین‌ها", value: "newest" },
  { title: "پرفروش ترین ها", value: "bestselling" },
  { title: "محبوب ترین", value: "favorite" },
  { title: "ارزان ترین", value: "cheapest" },
  { title: "گران ترین", value: "expensive" },
];
