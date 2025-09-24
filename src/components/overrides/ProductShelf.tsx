import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductShelf from "../organisms/CustomProductShelf";

const override: SectionOverride = {
  section: "ProductShelf",
  components: {
    ProductShelf: { props: { className: styles.customProductShelf } },
    __experimentalProductCard: { props: { className: styles.customProductCard } },
  },
};

export { override };
