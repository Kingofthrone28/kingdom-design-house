import Link from 'next/link';
import { useRouter } from 'next/router';
import { buildBreadcrumbs } from '../../utils/breadcrumbs';
import styles from '../../styles/Breadcrumbs.module.scss';

export default function Breadcrumbs({ customCrumbs }) {
  const router = useRouter();
  const breadcrumbs = customCrumbs || buildBreadcrumbs(router.asPath).map(item => ({ label: item.name, href: item.url }));
  // JSON-LD is emitted once by StructuredData; only real public ancestors are linked.
  return <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><ol className={styles.list}>
    {breadcrumbs.map((crumb, index) => <li key={crumb.href} className={styles.item}>
      {crumb.isLast || index === breadcrumbs.length - 1 ? <span className={styles.current} aria-current="page">{crumb.label}</span> : <>
        <Link href={crumb.href} className={styles.link}>{crumb.label}</Link><span className={styles.separator} aria-hidden="true">/</span>
      </>}
    </li>)}
  </ol></nav>;
}
