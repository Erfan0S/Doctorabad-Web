"use client";

export interface SelectOption {
  id: number | string;
  label: string;
}
 
interface Props {
  title: string;
  options: SelectOption[];
  selectedId?: number | string | null;
  onSelect: (id: number | string) => void;
  closeModal: (clearModals?: boolean) => void;
}

const SelectOptionsModal: React.FC<Props> = ({
  title,
  options = [],
  selectedId,
  onSelect,
  closeModal,
}) => {
  const handleClick = (id: number | string) => {
    onSelect(id);
    closeModal();
  };

  return (
    <div className="w-[min(92vw,360px)] overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] [direction:rtl]">
      <div className="bg-green-base px-3 py-[14px] text-center text-[18px] font-extrabold text-white">{title}</div>

      <div className="flex max-h-[330px] flex-col overflow-y-auto bg-white">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`w-full cursor-pointer border-0 border-b border-solid border-green-base/35 p-[14px] text-center text-[15px] font-semibold text-[#222] last:border-b-0 ${
              String(opt.id) === String(selectedId)
                ? "bg-green-base/10"
                : "bg-white active:bg-green-base/[0.08]"
            }`}
            onClick={() => handleClick(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectOptionsModal;
