import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '26f7e2ba73c7806bb028e84ca1042d50',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Pondok Pesantren Al-Islam',
  domain: 'alislammalang.com',
  author: 'Al-Islam Creative Teams',

  // open graph metadata (optional)
  description: 'Pondok Pesantren Al-Islam Malang Official Website',

  // social usernames (optional)
  // twitter: 'transitive_bs',
  // github: 'transitive-bullshit',
  // linkedin: 'fisch2',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  youtube: '@ppal-islammalang8138', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`
  instagram: 'alislammalang', // optional instagram username

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Profil',
      pageId: '26f7e2ba73c781a4a008c8a4be5268fb'
    },
    {
      title: 'Pendaftaran',
      pageId: '26f7e2ba73c7813abfa3f6bba7b6a469'
    },
    {
      title: 'Jadwal Mengaji',
      pageId: '26f7e2ba73c78100947fcb2f4bb98e87'
    },
    {
      title: 'Artikel dan Media',
      pageId: '26f7e2ba73c78172b172c71c07046427'
    },
    // {
    //   title: 'Santri',
    //   pageId: '26f7e2ba73c78160b249ff46b51c29cf'
    // },
    // {
    //   title: 'Alumni',
    //   pageId: '26f7e2ba73c781dc8f38d2a1df4b1c7a'
    // }
  ]
})
