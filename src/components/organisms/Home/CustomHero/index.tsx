import React from "react";
import { Link } from "@faststore/ui";
import styles from '../../../../sass/hero/styles.module.scss';

type Props = {
  image: string;
  link: string;
};

const CustomHero = ({ image, link }: Props) => {
  return (
    <Link href={link} className={styles.customHero}>
      <img src={image} alt="Banner principal" />
    </Link>
  );
};

export default CustomHero;
