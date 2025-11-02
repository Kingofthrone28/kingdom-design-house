// Navbar content data

export const navbarData = {
  contact: {
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com"
  },
  cta: {
    buttonText: "Book Now",
    ariaLabel: "Toggle menu",
    route: "/contact"
  },
  navigation: [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Services", route: "/services" },
    { name: "The Web Group", route: "/web-group" },
    { name: "The Network Group", route: "/network-group" },
    { name: "The AI Group", route: "/ai-group" },
    { name: "Pricing", route: "/pricing" }
  ],
  companyGroups: [
    "The Web Group",
    "The Network Group",
    "The AI Group"
  ],
  
  // Navigation data for NavBarGroup component
  navBarGroup: {
    navLinks: [
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Company Groups", hasSubmenu: true },
      { name: "Services", hasSubmenu: true },
      { name: "Pricing", route: "/pricing" }
    ],
    companyGroupsSubmenu: [
      { name: "The Web Group", route: "/web-group" },
      { name: "The Network Group", route: "/network-group" },
      { name: "The AI Group", route: "/ai-group" }
    ],
    webServicesSubmenu: [
      { name: "Web Design", route: "/web-group/services/web-design" },
      { name: "Web Development", route: "/web-group/services/web-development" },
      { name: "Digital Marketing", route: "/web-group/services/digital-marketing" },
      { name: "Support", route: "/web-group/services/support" }
    ],
    networkServicesSubmenu: [
      { name: "Network Design", route: "/network-group/services/network-design" },
      { name: "Network Optimization", route: "/network-group/services/network-optimization" },
      { name: "Network Support", route: "/network-group/services/network-support" }
    ],
    aiServicesSubmenu: [
      { name: "AI Development", route: "/ai-group/services/ai-development" },
      { name: "AI Consulting", route: "/ai-group/services/ai-consulting" },
      { name: "AI Support", route: "/ai-group/services/ai-support" }
    ]
  }
};

// Helper function to get navbar data
export const getNavbarData = () => {
  return navbarData;
};

// Helper function to get navBarGroup data
export const getNavBarGroupData = () => {
  return navbarData.navBarGroup;
};

// Helper function to update navbar data (for future use)
export const updateNavbarData = (newData) => {
  Object.assign(navbarData, newData);
  return navbarData;
};