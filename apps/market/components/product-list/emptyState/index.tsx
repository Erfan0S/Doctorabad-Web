import Image from "next/image";
import archiveEmptyState from "@/assets/img/archive-empty-state.png";

const ProductListEmptyState = () => {
  return (
    <div className="flex h-full max-h-[90vh] flex-col items-center justify-center text-center [&_img]:mb-10 [&_p]:text-sm [&_p]:font-semibold">
      <Image src={archiveEmptyState} alt="محصولی یافت نشد" />
      <p>محصولی مطابق با فیلترهای انتخابی شما یافت نشد!</p>
    </div>
  );
};

export default ProductListEmptyState;
