import Accordion from "../../accordion";
import style from "../Filters.module.scss";
import { SelectQroupItemType } from "@repo/core/types/filter";
import { Apps } from "@repo/core/types/general";

type Props = {
  items: SelectQroupItemType[];
  app?: Apps;
  dontHaveQuery?: boolean;
};

const SelectFilterQroup: React.FC<Props> = ({
  items,
  app = Apps.BASE,
  dontHaveQuery,
}) => {
  return (
    <div className={style.filters}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          className={`${style.filtersAccordion} ${item.className}`}
          title={item.title}
          items={item.data || []}
          queryKey={dontHaveQuery ? undefined : item.name}
          singleSelection={!item.multiSelection}
          isActive={item.isActive}
          isLoading={item.loading}
          dependencies={item.dependencies}
          app={app}
          initialTitle={item.initialTitle}
        />
      ))}
    </div>
  );
};

export default SelectFilterQroup;
