import React from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import NavbarGroup from './NavbarGroup';
import Breadcrumbs from './Molecules/Breadcrumbs';
import Footer from './Footer';
import JarvisFloat from './JarvisFloat';
import { SiteDataProvider } from '../contexts/SiteDataContext';
import { LayoutProvider } from '../contexts/LayoutContext';
import { pageData, defaultPageValues } from '../data/site/pageRouting';
import { getLayoutPageInfo } from '../utils/pageRouting';

const Layout = ({ children }) => {
  const router = useRouter();
  const pageInfo = getLayoutPageInfo(router.pathname, pageData, defaultPageValues);
  const showBreadcrumbs = router.pathname !== '/';

  return (
    <SiteDataProvider>
      <LayoutProvider>
        <div className="layout">
          {pageInfo.isGroupPage || pageInfo.isServicesPage ? (
            <NavbarGroup
              groupName={pageInfo.groupName}
              servicesPage={pageInfo.servicesPage}
            />
          ) : (
            <Navbar />
          )}
          <main className="main">{children}</main>
          {showBreadcrumbs && <Breadcrumbs />}
          <Footer />
          <JarvisFloat />
        </div>
      </LayoutProvider>
    </SiteDataProvider>
  );
};

export default Layout;
