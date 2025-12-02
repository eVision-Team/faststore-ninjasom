const mobileMenus = [
  {
    label: "Compre por departamento",
    component: require("./NavbarDepartmentsMobile").default,
    styleKey: "comprePorDepartamentoMobile",
    isAccordion: true,
  },
  {
    label: "Áudio",
    component: require("./NavbarAudioMobile").default,
    isAccordion: true,
  },
  {
    label: "Instrumentos",
    component: require("./NavbarInstrumentsMobile").default,
    isAccordion: true,
  },
  { label: "Promoções", styleKey: "promocoes", isAccordion: false, link: "/" },
  {
    label: "Nossas Lojas",
    styleKey: "nossasLojas",
    isAccordion: false,
    link: "/nossas-lojas",
  },
];

export default mobileMenus;
