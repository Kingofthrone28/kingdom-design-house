import Layout from '../Layout';
import SEOHead from '../SEOHead';
import StructuredData from '../StructuredData';
import AgencyServiceTemplate from './AgencyServiceTemplate';
import { serviceSeoData } from '../../lib/seo';
import { getAgencyServicePresentation } from '../../data/agencyServicePresentation';
import { getPageHeadline, getProcessData, getServiceContentData } from '../../data/siteData';

export default function AgencyServicePage({ serviceType, draftMode = false }) {
  const presentation = getAgencyServicePresentation(serviceType);
  const content = getServiceContentData(serviceType);
  const headline = getPageHeadline(serviceType);
  const process = getProcessData();
  const seo = serviceSeoData[presentation.seoKey];

  if (!content || !headline || !seo) {
    throw new Error(`Incomplete agency service configuration: ${serviceType}`);
  }

  const seoProps = draftMode
    ? {
        ...seo,
        title: `${seo.title} — Design Draft`,
        canonical: `/mock-drafts/${serviceType}/`,
        noindex: true
      }
    : seo;

  return (
    <>
      <SEOHead {...seoProps} />
      <StructuredData page={{ url: seo.canonical, name: seo.title, description: seo.description, service: content.title, breadcrumbs: [{ name: 'Home', url: '/' }, { name: presentation.groupLabel, url: presentation.groupName === 'aigroup' ? '/ai-group/' : presentation.groupName === 'networkgroup' ? '/network-group/' : '/web-group/' }, { name: content.title, url: seo.canonical }] }} />
      <Layout>
        <AgencyServiceTemplate
          serviceType={serviceType}
          presentation={presentation}
          content={content}
          headline={headline}
          process={process}
          draftMode={draftMode}
        />
      </Layout>
    </>
  );
}
