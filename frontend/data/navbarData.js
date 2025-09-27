// Navbar content data

export const navbarData = {
  contact: {
    phone: "347.927.8846",
    email: "info@kingdomdesignhouse.com"
  },
  cta: {
    buttonText: "Get A Quote",
    ariaLabel: "Toggle menu"
  },
  navigation: [
    { name: "The Web Group", route: "/web-group" },
    { name: "The Network Group", route: "/network-group" },
    { name: "The AI Group", route: "/ai-group" }
  ],
  companyGroups: [
    "The Web Group",
    "The Network Group",
    "The AI Group"
  ],
  
  // Navigation data for NavBarGroup component
  navBarGroup: {
    navLinks: [
      { name: "About", route: "/about" },
      { name: "Company Groups", route: "/company-groups" },
      { name: "Services", hasSubmenu: true },
      { name: "Pricing", route: "/pricing" }
    ],
    servicesSubmenu: [
      { name: "Web Design", route: "/web-group/services/web-design" },
      { name: "Web Development", route: "/web-group/services/web-development" },
      { name: "Digital Marketing", route: "/web-group/services/digital-marketing" },
      { name: "Support", route: "/web-group/services/support" }
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