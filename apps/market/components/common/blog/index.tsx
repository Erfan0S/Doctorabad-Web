"use client";
import Image from "next/image";
import Link from "next/link";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { BlogType } from "@/types/blog";

// was Blog.module.scss
const IMAGE =
  "h-[200px] mb-3 relative [&_a]:h-full [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_img]:max-w-full [&_img]:max-h-full [&_img]:object-cover [&_img]:rounded-xl";
const TITLE =
  "h-10 mb-3 [&_h2]:text-xs [&_h2]:text-center [&_h2]:m-0 [&_a]:text-black [&_a]:leading-5 [&_a]:line-clamp-2";

const Blog: React.FC<BlogType> = ({ pic_url, title, link }) => {
  return (
    <div className="bg-white rounded-3xl p-3 shadow-[0_5px_15px_rgba(0,0,0,0.15)]">
      <div className={IMAGE}>
        <a target="_blank" href={link}>
          <Image
            fill
            src={pic_url}
            alt={title}
            placeholder={placeHolderDataUrl}
          />
        </a>
      </div>
      <div className={TITLE}>
        <h2>
          <a target="_blank" href={link}>
            {title}
          </a>
        </h2>
      </div>
      <div className="text-center text-xs font-light text-gray">
        {/* <span>{category}</span> */}
      </div>
    </div>
  );
};
export default Blog;
