import Link from 'next/link';
import style from './ProductBreadcrumb.module.scss';

type Props = {
  items: { title: string; link?: string }[];
};

const ProductBreadcrumb = ({ items }: Props) => {
  return (
    <div className={style.productBreadcrumb}>
      <ul>
        <li>
          <Link href="/">دکترآباد</Link>
        </li>
        {items.map(({ title, link }) => (
          <li key={title}>{link ? <Link href={link}>{title}</Link> : <span>{title}</span>}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductBreadcrumb;
