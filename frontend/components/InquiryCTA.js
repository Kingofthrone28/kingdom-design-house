import Link from 'next/link';
import { useRouter } from 'next/router';
import { useJarvis } from '../contexts/JarvisContext';
import { contactHref, inquiryContext } from '../utils/acquisition';
import { trackAcquisition, trackOnce } from '../utils/analytics';
import styles from '../styles/Acquisition.module.scss';

export default function InquiryCTA({ service = '', cta = 'service-footer', label = 'Discuss your project', starter = '', demo = false }) {
  const router = useRouter();
  const { openJarvis } = useJarvis();
  const context = inquiryContext({ service, cta: demo ? 'assistant-demo' : cta, sourcePath: router.asPath || router.pathname });
  return <div className={styles.actions}>
    <Link className={styles.primary} href={contactHref(context)} onClick={() => {
      trackAcquisition('service_cta_click', context);
      if (demo) trackOnce('demo_request_start', 'assistant-demo', context);
    }}>{label} <span aria-hidden="true">↗</span></Link>
    <button type="button" className={styles.secondary} aria-haspopup="dialog" onClick={() => {
      trackAcquisition('service_cta_click', context);
      openJarvis(context, starter);
    }}>{demo ? 'Try the Jarvis demo' : 'Ask Jarvis about this'}</button>
  </div>;
}
