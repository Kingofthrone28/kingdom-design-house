import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import NavBarGroup from './navBarGroup';
import Footer from './Footer';
import { SiteDataProvider } from '../contexts/SiteDataContext';
import { getPageData, getdefaultValues } from '../data/siteData';

const Layout = ({ children }) => {
  const router = useRouter();
  const [pageInfo, setPageInfo] = useState({
    groupName: null,
    servicesPage: null,
    isGroupPage: false,
    isServicesPage: false
  });

  // Global function to extract page type and value from router pathname
  const getPageInfo = (pageType) => {
    const pathname = router.pathname;
    const pagePaths = getPageData()[pageType];
    
    if (!pagePaths) return null;
    
    // Sort paths by length (longest first) to match most specific paths first
    const sortedPaths = Object.entries(pagePaths).sort((a, b) => b[0].length - a[0].length);
    
    // Loop through the sorted page paths to find a match
    for (const [path, value] of sortedPaths) {
      if (pathname.includes(path)) {
        return value;
      }
    }
    
    // Return default fallback if no match found
    return getdefaultValues()[pageType] || null;
  };

  // Update page info when route changes
  useEffect(() => {
   
    const isGroupPage = router.pathname.includes('-group');
    const isServicesPage = router.pathname.includes('services');
    
    setPageInfo({
      groupName: getPageInfo('group'),
      servicesPage: getPageInfo('services'),
      isGroupPage,
      isServicesPage
    });
    
  }, [router.pathname]);
  
 const {
    groupName, 
    servicesPage, 
    isGroupPage, 
    isServicesPage
  } = pageInfo;

  return (
    <SiteDataProvider>
      <div className="layout">
        {isGroupPage || isServicesPage ? (
          <NavBarGroup groupName={groupName} servicesPage={servicesPage} />
        ) : (
          <Navbar />
        )}
        <main className="main">
          {children}
        </main>
        <Footer />
      </div>
    </SiteDataProvider>
  );
};

export default Layout;