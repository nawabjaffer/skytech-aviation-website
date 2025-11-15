import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/products', changefreq: 'weekly', priority: 0.8 },
    { url: '/services', changefreq: 'monthly', priority: 0.7 },
    { url: '/distributors', changefreq: 'monthly', priority: 0.7 },
    { url: '/contacts', changefreq: 'monthly', priority: 0.6 },
  ];

  const sitemapEntries = pages
    .map(({ url, changefreq, priority }) => {
      return `
        <url>
          <loc>${`https://www.skytechaviation.com${url}`}</loc>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>
      `;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
    ${sitemapEntries}
  </urlset>`;

  fs.writeFileSync(path.resolve(__dirname, 'sitemap.xml'), sitemap);
};

generateSitemap();