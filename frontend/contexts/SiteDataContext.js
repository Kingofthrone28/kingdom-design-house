import React, { createContext, useContext, useState } from 'react';
import { siteData, updateSiteData, updateContactInfo } from '../data/siteData';

// Create the context
const SiteDataContext = createContext();

// Custom hook to use the context
/**
 * useSiteData
 * @returns {Object} - The context for the SiteDataContext
 * @description Custom hook to use the SiteDataContext
 *  
 */
export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

// Provider component

/**
 * SiteDataProvider
 * @param {Object} children - The children components
 * @description Provider component for the SiteDataContext
 * @returns {Object} - The value for the SiteDataContext
 * @example
 */

export const SiteDataProvider = ({ children }) => {
  const [data, setData] = useState(siteData);

  // Update functions
  /**
   * Update the data
   * @param {String} section - The section to update
   * @param {Object} newData - The new data
   * @description Update the data
   */
  const updateData = (section, newData) => {
    const updatedData = updateSiteData(section, newData);
    setData({ ...updatedData });
  };
  
  /**
   * Update the contact information
   * @param {Object} newContactData - The new contact information
   * @description Update the contact information
   */
  const updateContact = (newContactData) => {
    const updatedContact = updateContactInfo(newContactData);
    setData(prev => ({
      ...prev,
      contact: updatedContact
    }));
  };

  /**
   * Getter functions
   * @returns {Object} - The data for the given section
   * @description Getter functions for the data
   */
  const getNavbarData = () => ({
    contact: data.contact,
    cta: data.navbar.cta,
    companyGroups: data.navbar.companyGroups
  });

  const getHeroData = () => data.hero;
  const getGroupsData = () => data.groups;
  const getProcessData = () => data.process;
  const getChatData = () => data.chat;
  const getWhyChooseUsData = () => data.whyChooseUs;
  const getFooterData = () => data.footer;

  /**
   * Value for the SiteDataContext
   * @returns {Object} - The value for the SiteDataContext
   * @description Value for the SiteDataContext
   */
  const value = {
    data,
    updateData,
    updateContact,
    getNavbarData,
    getHeroData,
    getGroupsData,
    getProcessData,
    getChatData,
    getWhyChooseUsData,
    getFooterData
  };

  return ( 
    // Provider component for the SiteDataContext
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
};