import React, { useEffect, useState } from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/hero/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";

type Props = {
  image: string;
  imageMobile: string;
  link: string;
};

const CustomHero = ({ image, imageMobile, link }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Link href={link} className={styles.customHero}>
      {isMobile ? (
        <img src={imageMobile} alt="Banner principal" />
      ) : (
        <img src={image} alt="Banner principal" />
      )}
    </Link>
  );
};

export default CustomHero;
