const menus = [
  {
    label: "Compre por departamento",
    component: require("./NavbarDepartments").default,
    styleKey: "comprePorDepartamento",
  },
  { label: "Áudio", component: require("./NavbarAudio").default },
  {
    label: "Instrumentos",
    component: require("./NavbarInstruments").default,
  },
  { label: "Promoções", styleKey: "promocoes" },
  { label: "Nossas Lojas", styleKey: "nossasLojas" },
];

export default menus;
