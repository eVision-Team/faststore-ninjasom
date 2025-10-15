import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/homeDoubleBanners/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";

type Props = {
  link: string;
  image: string;
};

const HomeDoubleBanners = ({
  banners,
  bannersMobile,
}: {
  banners: Props[];
  bannersMobile: Props[];
}) => {
  const firstTwo = banners.slice(0, 2);
  const firstTwoMobile = bannersMobile.slice(0, 2);
  const isMobile = useIsMobile();

  return (
    <div className={styles.homeDoubleBanners}>
      {isMobile ? (
        <div>
          {firstTwoMobile.map((banner, index) => (
            <Link
              key={index}
              href={banner.link}
              className={styles.homeDoubleBannersItem}
            >
              <img src={banner.image} alt={`Banner ${index + 1}`} />
            </Link>
          ))}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default HomeDoubleBanners;
