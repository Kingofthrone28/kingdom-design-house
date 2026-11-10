import Head from 'next/head';
import { useRouter } from 'next/router';
import { withTrailingSlash } from '../utils/url';
import { buildStructuredData } from '../lib/structuredData';

export default function StructuredData({ page = {} }) {
  const router = useRouter();
  const url = withTrailingSlash(router.asPath?.split(/[?#]/)[0] || '/');
  const data = buildStructuredData({ url, ...page });
  return <Head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} /></Head>;
}
