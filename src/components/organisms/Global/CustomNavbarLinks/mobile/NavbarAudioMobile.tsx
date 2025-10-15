import React from "react";
import { Link } from "@faststore/ui";
import items from "../NavbarAudio/items";
import styles from "../../../../../sass/customNavbarLinks/styles.module.scss";

const NavbarAudioMobile = () => {
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

export default NavbarAudioMobile;
