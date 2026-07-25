import React, { createContext, useContext } from 'react';
import { siteData } from '../data/siteData';

const SiteDataContext = createContext(null);

const siteDataValue = {
  data: siteData,
  getNavbarData: () => ({
    contact: siteData.contact,
    cta: siteData.navbar.cta,
    companyGroups: siteData.navbar.companyGroups
  }),
  getHeroData: () => siteData.hero,
  getGroupsData: () => siteData.groups,
  getProcessData: () => siteData.process,
  getChatData: () => siteData.chat,
  getWhyChooseUsData: () => siteData.whyChooseUs,
  getFooterData: () => siteData.footer
};

export const SiteDataProvider = ({ children }) => (
  <SiteDataContext.Provider value={siteDataValue}>
    {children}
  </SiteDataContext.Provider>
);

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error('useSiteData must be used within a SiteDataProvider');
  return context;
};
