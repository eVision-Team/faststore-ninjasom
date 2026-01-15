import React from "react";
import styles from "../../../../sass/homeBrands/styles.module.scss";
import { Link } from "@faststore/ui";
import useIsMobile from "../../../hooks/useIsMobile";
import { Carousel } from "@faststore/ui";

type Props = {
  link: string;
  image: string;
};

const HomeBrandsCarousel = ({ brands }: { brands: Props[] }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${styles.homeBrands} homeBrands`}>
      {isMobile ? (
        <Carousel
          // itemsPerPage={1}
          variant="scroll"
          transition={{ duration: 400, property: "transform" }}
        >
          {brands.map((brand, index) => (
            <Link
              href={brand.link}
              key={index}
              className={styles.homeBrandsItem}
            >
              <img src={brand.image} alt={`Marca ${index + 1}`} />
            </Link>
          ))}
        </Carousel>
      ) : (
        <div>
          <Carousel
            itemsPerPage={5}
            variant="scroll"
            transition={{ duration: 400, property: "transform" }}
          >
            {brands.map((brand, index) => (
              <Link
                href={brand.link}
                key={index}
                className={styles.homeBrandsItem}
              >
                <img src={brand.image} alt={`Marca ${index + 1}`} />
              </Link>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default HomeBrandsCarousel;
