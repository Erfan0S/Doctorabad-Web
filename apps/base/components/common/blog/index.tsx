"use client";
import Image from "next/image";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { BlogType } from "@/types/blog";

const Blog: React.FC<BlogType> = ({ pic_url, title, link }) => {
  return (
    <div className="rounded-xl border-[1.5px] border-solid border-[#dadada] bg-white px-2 pb-1 pt-2 shadow-[0_5px_15px_rgba(0,0,0,0.15)]">
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl">
        <a target="_blank" href={link} className="block h-full w-full">
          <Image
            fill
            src={pic_url || placeHolderDataUrl}
            alt={title}
            placeholder={placeHolderDataUrl}
            style={{ objectFit: "contain" }} // مهم
          />
        </a>
      </div>
      <div className="mb-3 h-10">
        <h2 className="m-0 text-center text-xs">
          <a target="_blank" href={link} className="line-clamp-2 leading-5 text-black">
            {title}
          </a>
        </h2>
      </div>
      <div className="text-center text-xs font-light text-gray">{/* <span>{category}</span> */}</div>
    </div>
  );
};
export default Blog;
