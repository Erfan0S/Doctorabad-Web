import Accordion from "../../accordion";
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
    <div className="mt-[10px] flex w-full flex-row flex-wrap justify-between gap-2">
      {items.map((item, index) => (
        <Accordion
          key={index}
          className={`w-[calc(50%-8px)] ${item.className}`}
          title={item.title}
          items={item.data || []}
          queryKey={dontHaveQuery ? undefined : item.name}
          singleSelection={!item.multiSelection}
          isActive={item.isActive}
          isLoading={item.loading}
          dependencies={item.dependencies}
          app={app}
          customContent={item.customContent}
          defaultValue={item.defaultValue}
        />
      ))}
    </div>
  );
};

export default SelectFilterQroup;
