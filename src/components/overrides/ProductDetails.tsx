import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductDetailsPrice from "../organisms/CustomProductDetailsPrice";

const override: SectionOverride = {
  section: "ProductDetails",
  components: {
    ProductPrice: { Component: CustomProductDetailsPrice },
  },
};

export { override };
