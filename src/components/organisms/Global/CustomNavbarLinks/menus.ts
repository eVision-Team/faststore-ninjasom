const menus = [
  {
    label: "Compre por departamento",
    component: require("./NavbarDepartments").default,
    styleKey: "comprePorDepartamento",
  },
  { label: "Áudio", component: require("./NavbarAudio").default, link: "/s?facets=productClusterIds&productClusterIds=163" },
  {
    label: "Instrumentos",
    component: require("./NavbarInstruments").default,
    link: "/s?facets=productClusterIds&productClusterIds=162",
  },
  { label: "Promoções", styleKey: "promocoes", link: "/promocoes" },
  { label: "Nossas Lojas", styleKey: "nossasLojas", link: "/nossas-lojas" },
];

export default menus;
