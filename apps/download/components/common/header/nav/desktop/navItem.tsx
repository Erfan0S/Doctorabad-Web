"use client";

import Link from "next/link";
import style from "../Nav.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames";
import { useState } from "react";

interface Props {
  href: string;
  title: string;
  image?: string | StaticImport;
  children?: JSX.Element[];
}
const MenuItem: React.FC<Props> = ({ href, title, children, image }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <li
        className={classNames({
          [style.hasChild!]: Boolean(children?.length),
          [style.menuHover!]: isHover,
        })}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsHover(false)}
      >
        <Link href={href}>{title}</Link>
        {Boolean(children?.length || image) && (
          <ul>
            {Boolean(children?.length) && children}
            {image && (
              <li className={style.navImage}>
                <Image src={image} alt="" layout="fill" />
              </li>
            )}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuItem;
