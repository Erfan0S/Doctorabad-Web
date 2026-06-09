import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryInList, CategoryList } from "@/types/category";
import style from "../Nav.module.scss";
import DesktopNavItem from "./navItem";

interface Props {
  navData: CategoryList;
}

/**
 * DesktopNav
 * Renders a vertical sidebar list of top-level categories.
 * Each item delegates hover-flyout rendering to DesktopNavItem.
 */
const DesktopNav = ({ navData }: Props) => {
  const mapCategory = (cat: CategoryInList) => ({
    id: cat.id,
    title: cat.title,
    href: generateProductCategoryUrlFromId(cat.id),
    image: cat.avatar_file?.info?.path ?? null,
    children: cat.children ?? [],
  });

  return (
    <nav className={style.nav} aria-label="دسته‌بندی کالاها">
      <ul className={style.navList} role="menubar">
        {navData.map((cat) => (
          <DesktopNavItem key={cat.id} category={mapCategory(cat)} />
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
