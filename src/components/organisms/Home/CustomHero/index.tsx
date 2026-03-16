import React, { useEffect, useMemo, useRef } from "react";
import { Carousel, Link } from "@faststore/ui";
import styles from "../../../../sass/hero/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";

interface BannerItem {
  image: string;
  imageMobile: string;
  link: string;
}

interface CustomHeroProps {
  image?: string;
  imageMobile?: string;
  link?: string;
  banners?: BannerItem[];
  interval?: number;
}

const CustomHero = ({
  image,
  imageMobile,
  link,
  banners,
  interval = 5000,
}: CustomHeroProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLElement>(null);

  const items = useMemo<BannerItem[]>(() => {
    if (Array.isArray(banners) && banners.length > 0) {
      return banners;
    }
    if (image || imageMobile || link) {
      return [{ image: image ?? "", imageMobile: imageMobile ?? "", link: link ?? "" }];
    }
    return [];
  }, [banners, image, imageMobile, link]);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      const nextBtn = containerRef.current?.querySelector<HTMLButtonElement>(
        '[data-fs-carousel-control="right"]'
      );
      nextBtn?.click();
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef}>
      <Carousel
        itemsPerPage={1}
        variant="slide"
        infiniteMode
        className={`${styles.customHero} customHeroSlider`}
      >
        {items.map((banner, idx) => {
          const isFirst = idx === 0;
          const src = isMobile ? (banner.imageMobile || banner.image) : banner.image;

          return (
            <Link href={banner.link} key={idx}>
              <img
                src={src}
                alt="Banner principal"
                loading={isFirst ? "eager" : "lazy"}
                {...(isFirst && { fetchPriority: "high" })}
              />
            </Link>
          );
        })}
      </Carousel>
    </section>
  );
};

export default CustomHero;
