import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import About from '../pages/about';
import { getAboutData } from '../data/siteData';

jest.mock('../components/Layout', () => {
  const { SiteDataProvider } = require('../contexts/SiteDataContext');
  return function Layout({ children }) {
    return <SiteDataProvider>{children}</SiteDataProvider>;
  };
});
jest.mock('../components/SEOHead', () => () => null);
jest.mock('../components/StructuredData', () => () => null);
jest.mock('next/image', () => {
  const React = require('react');
  return function Image({ priority, fill, fetchPriority, ...props }) {
    return React.createElement('img', props);
  };
});

const stripMarkup = html => html.replace(/<[^>]*>/g, ' ').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

describe('About page founder experience', () => {
  const html = renderToStaticMarkup(<About />);
  const text = stripMarkup(html);

  test('renders the founder identity and biography without client JavaScript', () => {
    const { title, subTitle, content } = getAboutData();
    expect(text).toContain(title);
    expect(text).toContain(subTitle);
    content.forEach(paragraph => expect(text).toContain(paragraph));
  });

  test('includes an accessible founder portrait', () => {
    expect(html).toContain('src="/images/paul-profile.png"');
    expect(html).toContain('alt="Paul Solomon - Founder of Kingdom Design House"');
  });

  test('preserves the process and company introduction after the biography', () => {
    const process = text.indexOf('Process');
    const introduction = text.indexOf('Choose Us');
    expect(process).toBeGreaterThan(text.indexOf('Paul Solomon'));
    expect(introduction).toBeGreaterThan(process);
  });
});
