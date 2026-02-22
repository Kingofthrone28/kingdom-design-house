const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;
const NON_HTTP_LINK_REGEX = /^(mailto:|tel:|javascript:|#)/i;

/**
 * Normalize internal paths to trailing-slash canonical URLs.
 * Leaves absolute/external URLs and non-http links untouched.
 */
export const withTrailingSlash = (inputPath = '/') => {
  if (typeof inputPath !== 'string') {
    return '/';
  }

  const rawPath = inputPath.trim();
  if (!rawPath) {
    return '/';
  }

  if (ABSOLUTE_URL_REGEX.test(rawPath) || NON_HTTP_LINK_REGEX.test(rawPath)) {
    return rawPath;
  }

  const [pathWithQuery, hash = ''] = rawPath.split('#');
  const [pathname, query = ''] = pathWithQuery.split('?');

  const normalizedPathname = pathname === '/'
    ? '/'
    : `${(pathname.startsWith('/') ? pathname : `/${pathname}`).replace(/\/+$/, '')}/`;

  let normalized = normalizedPathname;
  if (query) {
    normalized += `?${query}`;
  }
  if (hash) {
    normalized += `#${hash}`;
  }

  return normalized;
};

export const toAbsoluteUrl = (baseUrl, path = '/') => {
  if (typeof path === 'string' && ABSOLUTE_URL_REGEX.test(path.trim())) {
    return path.trim();
  }

  return `${baseUrl.replace(/\/+$/, '')}${withTrailingSlash(path)}`;
};

export const toAbsoluteAssetUrl = (baseUrl, path = '') => {
  if (typeof path === 'string' && ABSOLUTE_URL_REGEX.test(path.trim())) {
    return path.trim();
  }

  const cleanPath = typeof path === 'string' ? path.trim() : '';
  if (!cleanPath) {
    return baseUrl.replace(/\/+$/, '');
  }

  return `${baseUrl.replace(/\/+$/, '')}/${cleanPath.replace(/^\/+/, '')}`;
};
