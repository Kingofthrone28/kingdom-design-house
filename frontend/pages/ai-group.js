import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AgencyGroupLanding from '../components/Organisms/AgencyGroupLanding';
import { pageSeoData } from '../lib/seo';

export default function AIGroup() {
  const seoData = pageSeoData.aiGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <AgencyGroupLanding groupType="ai" />
      </Layout>
    </>
  );
}
