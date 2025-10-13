import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/homeDoubleBanners/styles.module.scss";

type Props = {
  link: string;
  image: string;
};

const HomeDoubleBanners = ({ banners }: { banners: Props[] }) => {
  const firstTwo = banners.slice(0, 2);

  return (
    <div className={styles.homeDoubleBanners}>
      {firstTwo.map((banner, index) => (
        <Link
          key={index}
          href={banner.link}
          className={styles.homeDoubleBannersItem}
        >
          <img src={banner.image} alt={`Banner ${index + 1}`} />
        </Link>
      ))}
    </div>
  );
};

export default HomeDoubleBanners;
