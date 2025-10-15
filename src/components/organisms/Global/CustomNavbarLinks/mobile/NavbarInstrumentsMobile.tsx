import React from "react";
import { Link } from "@faststore/ui";
import items from "../NavbarInstruments/items";
import styles from "../../../../../sass/customNavbarLinks/styles.module.scss";

const NavbarInstrumentsMobile = () => {
  return (
    <div className={styles.mobileSubmenu}>
      {items.map((item, index) => (
        <Link href={item.link} key={index}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarInstrumentsMobile;
