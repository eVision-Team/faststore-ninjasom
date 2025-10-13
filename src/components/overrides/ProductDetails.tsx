import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductDetailsPrice from "../organisms/Product/CustomProductDetailsPrice";
import CustomProductDetailsTitle from "../organisms/Product/CustomProductDetailsTitle";

const override: SectionOverride = {
  section: "ProductDetails",
  components: {
    ProductPrice: { Component: CustomProductDetailsPrice },
    ProductTitle: { Component: CustomProductDetailsTitle },
  },
};

export { override };
