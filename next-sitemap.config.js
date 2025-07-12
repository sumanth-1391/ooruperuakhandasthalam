/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ooruperuakhandasthalam.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/admin/**', '/login'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://ooruperuakhandasthalam.vercel.app/sitemap.xml',
    ],
  },
}
