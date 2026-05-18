import TileListItem, { CategoryType } from "./CategoryListItem";
import style from "./CategoriesList.module.scss";

type Props = {
  categories: CategoryType[];
  baseUrl?: string;
};

const TileList = ({ categories, baseUrl }: Props) => {
  return (
    <div className={style.ListWrapper}>
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
