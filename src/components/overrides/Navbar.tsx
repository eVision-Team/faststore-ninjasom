// import { Navbar, NavbarHeader, NavbarRow, NavbarButtons } from "@faststore/ui";
import { SectionOverride } from "@faststore/core";
import styles from "../../sass/navbar/styles.module.scss";

const override: SectionOverride = {
  section: "Navbar",
  components: {
    Navbar: { props: { className: styles.customNavbar } },
    NavbarRow: { props: { className: styles.customNavbar } },
    NavbarButtons: { props: { className: styles.customNavbarButtons } },
  },
};

export { override };
