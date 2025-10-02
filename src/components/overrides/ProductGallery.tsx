import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductCard from "../organisms/CustomProductCard";

const override: SectionOverride = {
  section: "ProductGallery",
  components: {
    __experimentalProductCard: { Component: CustomProductCard },
  },
};

export { override };
