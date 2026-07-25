export const matchPageValue = (pathname, routes = {}, fallback = null) => {
  const match = Object.entries(routes)
    .sort(([left], [right]) => right.length - left.length)
    .find(([path]) => pathname.includes(path));

  return match?.[1] ?? fallback;
};

export const getLayoutPageInfo = (pathname, pageData, defaultValues) => ({
  groupName: matchPageValue(pathname, pageData.group, defaultValues.group),
  servicesPage: matchPageValue(pathname, pageData.services, defaultValues.services),
  isGroupPage: pathname.includes('-group'),
  isServicesPage: pathname.includes('services')
});
