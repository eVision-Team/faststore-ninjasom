import React, { useState } from "react";
import styles from "../../../sass/customNavbarLinks/styles.module.scss";
import menuIcon from "./icons/compre-por-departamento-icon.png";
import Image from "next/image";

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

const CustomNavbarLinks = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className={styles.customNavbarLinks}>
      {menus.map((menu, index) => {
        const SubmenuComponent = menu.component;
        const menuClass = menu.styleKey ? styles[menu.styleKey] : "";

        return (
          <div
            key={index}
            className={`${styles.menuItem} ${menuClass}`}
            onMouseEnter={() => setActiveMenu(menu.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className={styles.menuLabelWrapper}>
              {menu.label == "Compre por departamento" && (
                <Image src={menuIcon} alt="Compre por departamento" />
              )}
              <span>{menu.label}</span>
            </div>

            {SubmenuComponent && activeMenu === menu.label && (
              <div>
                <SubmenuComponent />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomNavbarLinks;
