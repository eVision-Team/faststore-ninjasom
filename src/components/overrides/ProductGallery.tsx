import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductCard from "../organisms/Global/CustomProductCard";
import CustomSortSkeleton from "../organisms/Category/CustomSortSkeleton";
import CustomFilterDesktop from "../organisms/Category/CustomFilterDesktop";

const override: SectionOverride = {
  section: "ProductGallery",
  components: {
    __experimentalEmptyGallery: { props: { className: styles.customProductEmptyGallery } },
    __experimentalProductCard: { Component: CustomProductCard },
    SortSkeleton: { Component: CustomSortSkeleton },
    __experimentalFilterDesktop: { Component: CustomFilterDesktop },
  },
};

export { override };
