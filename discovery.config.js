module.exports = {
  seo: {
    title: "Ninja Som - Encontre aqui Equipamentos de Som Profissional",
    description:
      "Encontre aqui Equipamentos de Som Profissional com as melhores ofertas. Som Profissional com preço baixo e entrega rápida. Instrumentos Ninja Som.",
    titleTemplate: "%s | Ninja Som",
    author: "eVision",
  },
  // Theming
  theme: "custom-theme",

  // Ecommerce Platform
  platform: "vtex",

  // Platform specific configs for API
  api: {
    storeId: "ninjasomfaststore",
    workspace: "master",
    environment: "vtexcommercestable",
    hideUnavailableItems: false,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: "BRL",
      symbol: "R$",
    },
    locale: "pt-BR",
    channel: '{"salesChannel":1,"regionId":""}',
    country: "BRA",
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: "",
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: "https://ninjasomfaststore.vtex.app",
  secureSubdomain: "https://secure.vtexfaststore.com/",
  checkoutUrl: "https://secure.vtexfaststore.com/checkout",
  loginUrl: "https://secure.vtexfaststore.com/api/io/login",
  accountUrl: "https://secure.vtexfaststore.com/api/io/account",

  previewRedirects: {
    home: "/",
    plp: "/home%20theater",
    search: "/s?q=Telefunken",
    pdp: "/soundbar---subwoofer-wireless-polaris-900---telefunke/p",
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || "http://localhost:3000",
    pages: {
      home: "/",
      pdp: "/soundbar---subwoofer-wireless-polaris-900---telefunke/p",
      collection: "/home%20theater",
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: "/",
      pdp: "/soundbar---subwoofer-wireless-polaris-900---telefunke/p",
      collection: "/home%20theater",
      collection_filtered:
        "/home%20theater/?category-1=home%20theater&brand=Telefunken&facets=category-1%2Cbrand%27",
      search: "/s?q=Telefunken",
    },
    browser: "electron",
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: "",
  },

  experimental: {
    nodeVersion: 18,
    cypressVersion: 12,
  },

  vtexHeadlessCms: {
    webhookUrls: [
      "https://ninjasomfaststore.myvtex.com/cms-releases/webhook-releases",
    ],
  },
};
