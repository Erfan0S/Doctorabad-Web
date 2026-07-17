import Link from 'next/link';

// shared by the static first crumb and every mapped crumb
const LI_CLASS =
  "me-1.5 inline-flex after:ms-1.5 after:text-gray after:content-['>'] last-of-type:me-0 last-of-type:after:hidden [&_a]:inline-block [&_a]:max-w-[100px] [&_a]:truncate [&_a]:text-gray [&_span]:inline-block [&_span]:max-w-[100px] [&_span]:truncate [&_span]:text-gray last-of-type:[&_a]:font-semibold last-of-type:[&_span]:font-semibold";

type Props = {
  items: { title: string; link?: string }[];
};

const ProductBreadcrumb = ({ items }: Props) => {
  return (
    <div className="mb-4">
      <ul className="m-0 flex list-none flex-wrap items-center p-0">
        <li className={LI_CLASS}>
          <Link href="/">دکترآباد</Link>
        </li>
        {items.map(({ title, link }) => (
          <li key={title} className={LI_CLASS}>{link ? <Link href={link}>{title}</Link> : <span>{title}</span>}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductBreadcrumb;
