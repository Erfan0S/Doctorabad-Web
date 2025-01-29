import { generateProductCategoryUrlFromId } from "@repo/core/utils";
import { CategoryInList, CategoryList } from "@/types/category";
import style from "../Nav.module.scss";
import MenuItem from "./navItem";

interface Props {
  navData: CategoryList;
}

const DesktopNav = ({ navData }: Props) => {
  const recursivelyRenderChildren = (childrenData: CategoryInList) => {
    const { id, title, children, avatar_file } = childrenData;

    const componentProps = {
      href: generateProductCategoryUrlFromId(id),
      title,
      ...(avatar_file && { image: avatar_file.info.path }),
      ...(children && {
        children: children.map((innerChildrenData) =>
          recursivelyRenderChildren(innerChildrenData)
        ),
      }),
    };
    return <MenuItem {...componentProps} key={id} />;
  };

  return (
    <>
      <nav className={style.nav}>
        <ul>
          {navData.map((menuItems) => recursivelyRenderChildren(menuItems))}
        </ul>
      </nav>
    </>
  );
};

export default DesktopNav;
