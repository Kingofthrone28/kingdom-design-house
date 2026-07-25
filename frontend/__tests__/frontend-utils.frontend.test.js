import { scrollToChatOrContact } from '../utils/navigation';
import { getLayoutPageInfo, matchPageValue } from '../utils/pageRouting';
import { formatResponse, tokenizeHighlightedText } from '../utils/responseFormatter';

describe('page routing', () => {
  const pageData = {
    group: { 'web-group': 'webgroup', 'ai-group': 'aigroup' },
    services: { 'web-group/services/web-design': 'web-design' }
  };
  const defaults = { group: 'webgroup', services: 'web-development' };

  test('prefers the most specific route match', () => {
    expect(matchPageValue('/web-group/services/web-design', {
      'web-group': 'group',
      'web-group/services/web-design': 'service'
    })).toBe('service');
  });

  test.each([
    ['/', false, false],
    ['/web-group/', true, false],
    ['/web-group/services/web-design/', true, true],
    ['/case-studies/northwell/', false, false]
  ])('classifies %s', (pathname, isGroupPage, isServicesPage) => {
    expect(getLayoutPageInfo(pathname, pageData, defaults)).toMatchObject({
      isGroupPage,
      isServicesPage
    });
  });
});

describe('chat navigation', () => {
  afterEach(() => {
    delete global.document;
  });

  test('scrolls to the chat when it exists', () => {
    const scrollIntoView = jest.fn();
    global.document = { getElementById: jest.fn(() => ({ scrollIntoView })) };
    const router = { push: jest.fn() };

    expect(scrollToChatOrContact({ router })).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(router.push).not.toHaveBeenCalled();
  });

  test('uses the contact route as a fallback', () => {
    global.document = { getElementById: jest.fn(() => null) };
    const router = { push: jest.fn() };

    expect(scrollToChatOrContact({ router })).toBe(false);
    expect(router.push).toHaveBeenCalledWith('/contact/');
  });
});

describe('safe response formatting', () => {
  test('returns highlighted text as tokens rather than HTML', () => {
    expect(tokenizeHighlightedText('React project', ['react'])).toEqual([
      { text: 'React', highlighted: true },
      { text: ' project', highlighted: false }
    ]);
  });

  test('preserves malicious-looking input as plain text', () => {
    const formatted = formatResponse('<img src=x onerror=alert(1)> web design');
    expect(formatted[0].content.map((token) => token.text).join('')).toBe(
      '<img src=x onerror=alert(1)> web design'
    );
  });

  test('supports empty, bullet, and question responses', () => {
    expect(formatResponse('')).toHaveLength(1);
    expect(formatResponse('- Responsive design')[0].type).toBe('bullet');
    expect(formatResponse('What is your budget?')[0].type).toBe('question');
  });
});
