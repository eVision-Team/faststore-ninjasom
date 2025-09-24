import React from "react";
import styles from "../../../sass/homeBrands/styles.module.scss";
import { Link } from "@faststore/ui";
type Props = {
  link: string;
  image: string;
};

const HomeBrands = ({ banners }: { banners: Props[] }) => {
  return (
    <div className={styles.homeBrands}>
      {banners.map((brand, index) => (
        <Link href={brand.link} key={index} className={styles.homeBrandsItem}>
          <img src={brand.image} alt={`Marca ${index + 1}`} />
        </Link>
      ))}
    </div>
  );
};

export default HomeBrands;
