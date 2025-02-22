"use client";
import Image from "next/image";
import style from "./Blog.module.scss";
import Link from "next/link";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { BlogType } from "@/types/blog";

const Blog: React.FC<BlogType> = ({ pic_url, title, link }) => {
  return (
    <div className={style.blog}>
      <div className={style.blogImage}>
        <a target="_blank" href={link}>
          <Image
            fill
            src={pic_url}
            alt={title}
            placeholder={placeHolderDataUrl}
          />
        </a>
      </div>
      <div className={style.blogTitle}>
        <h2>
          <a target="_blank" href={link}>
            {title}
          </a>
        </h2>
      </div>
      <div className={style.blogCategory}>{/* <span>{category}</span> */}</div>
    </div>
  );
};
export default Blog;
