import React from "react";
import { Carousel, Link } from "@faststore/ui";
import styles from "../../../../sass/hero/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";

type Props = {
  image: string;
  imageMobile: string;
  link: string;
};

type CustomHeroProps = Partial<Props> & {
  banners?: Props[];
};

const CustomHero = ({ image, imageMobile, link, banners }: CustomHeroProps) => {
  const isMobile = useIsMobile();
  const items = Array.isArray(banners) && banners.length > 0
    ? banners
    : image || imageMobile || link
      ? [{ image: image ?? "", imageMobile: imageMobile ?? "", link: link ?? "" }]
      : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <Carousel itemsPerPage={1} variant="slide" className={`${styles.customHero} customHeroSlider`}>
      {items.map((banner, index) => (
        <Link href={banner.link} key={index}>
          {isMobile ? (
            <img src={banner.imageMobile || banner.image} alt="Banner principal" />
          ) : (
            <img src={banner.image} alt="Banner principal" />
          )}
        </Link>
      ))}
    </Carousel>
  );
};

export default CustomHero;
