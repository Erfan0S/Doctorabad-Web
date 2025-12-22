"use client";

import styles from "./SelectOptions.module.scss";

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
    <div className={styles.selectModal}>
      <div className={styles.header}>{title}</div>

      <div className={styles.optionsWrapper}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`${styles.option} ${
              String(opt.id) === String(selectedId) ? styles.optionActive : ""
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
