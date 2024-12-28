export interface Variant {
  added_price: number;
  check_box: Boolean;
  id: number;
  need_user_explanation
: boolean;
  option_value: string;
  quantity: number;
}

export interface Variants {
  [key: string]: Variant[];
}

export interface VariantsSelections {
  [key: string]: Variant[];
}

export interface VariantsCheckBox {
  category: string;
  variants: Variant[];
}

export interface ProductVariants {
  checkbox: VariantsCheckBox[];
  selections: VariantsSelections;
}

export interface ProductVariantsValue {
  id: number | string;
  option_title: string;
  user_explanation: string | null;
}
export interface ProductVariantsValues {
  [key: string]: ProductVariantsValue;
}

export interface CartVariants {
  product_variant_id: number;
  user_explanation: string | null;
  added_price: number;
  option_value: string;
  option_title: string;
  check_box: boolean;
}
