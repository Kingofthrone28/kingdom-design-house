import fs from 'node:fs';
import path from 'node:path';

describe('About page UI/UX experience section', () => {
  const aboutSource = fs.readFileSync(path.join(process.cwd(), 'pages/about.js'), 'utf8');
  const experienceSource = fs.readFileSync(
    path.join(process.cwd(), 'components/Organisms/UIUXExperience.js'),
    'utf8'
  );

  test('renders the experience section on the About page', () => {
    expect(aboutSource).toContain('UIUXExperience');
    expect(aboutSource).toContain('<UIUXExperience />');
  });

  test.each([
    'Institute for Integrative Nutrition',
    'Kingdom Design House'
  ])('includes the %s experience entry', (company) => {
    expect(experienceSource).toContain(`company: '${company}'`);
  });

  test('links the professional contribution to its case study', () => {
    expect(experienceSource).toContain("href: '/case-studies/iin/'");
  });

  test('uses semantic section and list structure', () => {
    expect(experienceSource).toContain('aria-labelledby="ui-ux-experience-title"');
    expect(experienceSource).toContain('<ol');
    expect(experienceSource).toContain('<h3>{item.company}</h3>');
  });
});
