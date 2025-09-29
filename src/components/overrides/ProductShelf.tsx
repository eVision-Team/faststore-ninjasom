import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductCard from "../organisms/CustomProductCard";

const override: SectionOverride = {
  section: "ProductShelf",
  components: {
    ProductShelf: { props: { className: styles.customProductShelf } },
    // __experimentalProductCard: { props: { className: styles.customProductCard } },
    __experimentalProductCard: { Component: CustomProductCard },
  },
};

export { override };
