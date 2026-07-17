import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryList } from "@/types/category";
import DesktopNavItem from "./navItem";

interface Props {
  navData: CategoryList;
}

const DesktopNav = ({ navData }: Props) => {
  return (
    <nav className="market-nav" aria-label="دسته‌بندی کالاها">
      <ul className="market-nav-root" role="menubar">
        {navData.map((category) => (
          <DesktopNavItem
            key={category.id}
            item={category}
            href={generateProductCategoryUrlFromId(category.id)}
            level={1}
          />
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
