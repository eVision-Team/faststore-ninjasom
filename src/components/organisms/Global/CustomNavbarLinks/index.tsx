import React, { useEffect, useState } from "react";
import styles from "../../../../sass/customNavbarLinks/styles.module.scss";
import menuIcon from "./icons/compre-por-departamento-icon.png";
import Image from "next/image";
import { Link } from "@faststore/ui";
import MobileNavbarLinks from "./mobile/MobileNavbarLinks";
import menus from "./menus";
import useIsMobile from "../../../hooks/useIsMobile";

const CustomNavbarLinks = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavbarLinks />;
  }

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
            <Link className={styles.menuLabelWrapper} href={menu.link}>
              {menu.label == "Compre por departamento" && (
                <Image src={menuIcon} alt="Compre por departamento" />
              )}
              <span>{menu.label}</span>
            </Link>

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
