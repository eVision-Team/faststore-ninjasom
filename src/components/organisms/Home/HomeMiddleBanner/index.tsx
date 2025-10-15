import React from "react";
import styles from "../../../../sass/homeMiddleBanner/styles.module.scss";
import { Link } from "@faststore/ui";
import useIsMobile from "../../../hooks/useIsMobile";

type Props = {
  link: string;
  image: string;
  imageMobile: string;
};

const HomeMiddleBanner = ({ link, image, imageMobile }: Props) => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.homeMiddleBanner}>
      <Link href={link}>
        {isMobile ? (
          <img src={imageMobile} alt="Banner Meio" />
        ) : (
          <img src={image} alt="Banner Meio" />
        )}
      </Link>
    </section>
  );
};

export default HomeMiddleBanner;
