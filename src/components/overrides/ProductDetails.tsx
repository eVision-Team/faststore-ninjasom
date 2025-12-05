import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductDetailsPrice from "../organisms/Product/CustomProductDetailsPrice";
import CustomProductDetailsTitle from "../organisms/Product/CustomProductDetailsTitle";
import CustomProdutDetailsDescription from "../organisms/Product/CustomProductDetailsDescription";
import CustomImageGallery from "../organisms/Product/CustomImageGallery";

const override: SectionOverride = {
  section: "ProductDetails",
  components: {
    ProductPrice: { Component: CustomProductDetailsPrice },
    ProductTitle: { Component: CustomProductDetailsTitle },
    __experimentalProductDescription: {
      Component: CustomProdutDetailsDescription,
    },
    ImageGalleryViewer: { Component: () => null },
    ImageGallery: { Component: CustomImageGallery },
  },
};

export { override };
