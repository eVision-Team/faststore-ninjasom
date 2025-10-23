import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductCard from "../organisms/Global/CustomProductCard";
import CustomSortSkeleton from "../organisms/Category/CustomSortSkeleton";

const override: SectionOverride = {
  section: "ProductGallery",
  components: {
    __experimentalProductCard: { Component: CustomProductCard },
    SortSkeleton: { Component: CustomSortSkeleton },
  },
};

export { override };
