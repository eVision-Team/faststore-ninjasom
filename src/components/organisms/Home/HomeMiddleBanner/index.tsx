import React from "react";
import styles from "../../../../sass/homeMiddleBanner/styles.module.scss";
import { Link } from "@faststore/ui";

type Props = {
  link: string;
  image: string;
};

const HomeMiddleBanner = ({ link, image }: Props) => {
  return (
    <section className={styles.homeMiddleBanner}>
      <Link href={link}>
        <img src={image} alt="Banner Meio" />
      </Link>
    </section>
  );
};

export default HomeMiddleBanner;
