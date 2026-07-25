import React from 'react';
import Layout from '../Layout';
import SEOHead from '../SEOHead';
import EditorialCaseStudy from './EditorialCaseStudy';

const EditorialCaseStudyPage = ({ data, seo = data.seo }) => (
  <>
    <SEOHead {...seo} />
    <Layout>
      <EditorialCaseStudy data={data} />
    </Layout>
  </>
);

export default EditorialCaseStudyPage;
