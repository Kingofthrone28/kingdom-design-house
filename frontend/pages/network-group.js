import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AgencyGroupLanding from '../components/Organisms/AgencyGroupLanding';
import { pageSeoData } from '../lib/seo';

export default function NetworkGroup() {
  const seoData = pageSeoData.networkGroup;
  
  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData />
      
      <Layout>
        <AgencyGroupLanding groupType="network" />
      </Layout>
    </>
  );
}
