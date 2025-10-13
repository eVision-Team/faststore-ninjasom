// import { Navbar, NavbarHeader, NavbarRow, NavbarButtons } from "@faststore/ui";
import { SectionOverride } from "@faststore/core";
import styles from "../../sass/navbar/styles.module.scss";
import CustomNavbarLinks from "../organisms/Global/CustomNavbarLinks";

const override: SectionOverride = {
  section: "Navbar",
  components: {
    Navbar: { props: { className: styles.customNavbar } },
    NavbarRow: { props: { className: styles.customNavbar } },
    NavbarButtons: { props: { className: styles.customNavbarButtons } },
    NavbarLinks: { Component: () => <CustomNavbarLinks /> },
    NavbarSliderFooter: { props: { className: styles.customNavbarSliderFooter } },
  },
};

export { override };
