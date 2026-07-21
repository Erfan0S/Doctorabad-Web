import TileListItem, { CategoryType } from "./CategoryListItem";

type Props = {
  categories: CategoryType[];
  baseUrl?: string;
};

const TileList = ({ categories, baseUrl }: Props) => {
  return (
    <div className="mx-auto flex w-full flex-wrap justify-center gap-x-[8px] gap-y-[12px] px-[10px] pt-[8px]">
      {categories.map((category, i) => (
        <TileListItem
          key={`${category.id}-${i}`}
          category={category}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default TileList;
