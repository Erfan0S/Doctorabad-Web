import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryList } from "@/types/category";
import style from "../Nav.module.scss";
import DesktopNavItem from "./navItem";

interface Props {
  navData: CategoryList;
}

const DesktopNav = ({ navData }: Props) => {
  return (
    <nav className={style.nav} aria-label="دسته‌بندی کالاها">
      <ul className={style.navRoot} role="menubar">
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
