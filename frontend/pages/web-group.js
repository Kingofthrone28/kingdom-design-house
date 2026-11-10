import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AgencyGroupLanding from '../components/Organisms/AgencyGroupLanding';
import { pageSeoData } from '../lib/seo';

export default function WebGroup() {
  const seoData = pageSeoData.webGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData page={{ url: seoData.canonical, name: seoData.title, description: seoData.description }} />
      
      <Layout>
        <AgencyGroupLanding groupType="web" />
      </Layout>
    </>
  );
}
