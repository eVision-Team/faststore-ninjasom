import React from "react";
import items from "./items";
import { Link } from "@faststore/ui";
import styles from "../../../../../sass/customNavbarLinks/styles.module.scss";
import Image from "next/image";

const NavbarAudio = () => {
  return (
    <div className={styles.submenuContainer}>
      <div className={styles.submenu}>
        {items.map((item, index) => (
          <Link href={item.link} key={index} className={styles.navbarImageItem}>
            <Image src={item.img} alt={item.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarAudio;
