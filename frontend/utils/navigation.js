import { withTrailingSlash } from './url';

export const scrollToChatOrContact = ({
  router,
  contactPath = '/contact/',
  behavior = 'smooth'
} = {}) => {
  if (typeof document !== 'undefined') {
    const chatSection = document.getElementById('chat-jarvis');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior, block: 'start' });
      return true;
    }
  }

  const destination = withTrailingSlash(contactPath);
  if (router?.push) {
    router.push(destination);
  } else if (typeof window !== 'undefined') {
    window.location.assign(destination);
  }
  return false;
};
