import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductCard from "../organisms/Global/CustomProductCard";

const override: SectionOverride = {
  section: "CrossSellingShelf",
  components: {
    ProductShelf: { props: { className: `${styles.customProductShelf} crossSellingShelf` } },
    __experimentalCarousel: { props: { className: `crossSellingShelf` } },
    __experimentalProductCard: { Component: CustomProductCard },
  },
};

export { override };
