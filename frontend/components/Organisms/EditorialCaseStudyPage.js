import React from 'react';
import Layout from '../Layout';
import SEOHead from '../SEOHead';
import EditorialCaseStudy from './EditorialCaseStudy';
import StructuredData from '../StructuredData';
import InquiryCTA from '../InquiryCTA';
import Link from 'next/link';
import styles from '../../styles/Acquisition.module.scss';

const EditorialCaseStudyPage = ({ data, seo = data.seo }) => (
  <>
    <SEOHead {...seo} />
    <StructuredData page={{ url: seo.canonical, name: seo.title, description: seo.description }} />
    <Layout>
      <EditorialCaseStudy data={data} />
      <section className={styles.surface}>
        <div className={styles.section}>
        <h2>Plan a related project</h2>
        <p>Use these contributions to discuss the kind of work you need. Scope, responsibilities, and expected outcomes are agreed for each project.</p>
        <nav className={styles.related} aria-label="Services related to this work">
          <Link href="/web-group/services/web-design/">Web design ↗</Link>
          <Link href="/web-group/services/web-development/">Web development and business applications ↗</Link>
          {['/case-studies/daremd/', '/case-studies/dermcare/', '/case-studies/northwell/'].includes(seo.canonical) && <Link href="/industries/healthcare-websites/">Healthcare website guidance ↗</Link>}
        </nav>
        <InquiryCTA cta="proof" service="web-development" label="Discuss a website or application" />
        </div>
      </section>
    </Layout>
  </>
);

export default EditorialCaseStudyPage;
