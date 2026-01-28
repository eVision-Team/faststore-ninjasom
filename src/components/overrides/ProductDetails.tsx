import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomProductDetailsPrice from "../organisms/Product/CustomProductDetailsPrice";
import CustomProductDetailsTitle from "../organisms/Product/CustomProductDetailsTitle";
import CustomProdutDetailsDescription from "../organisms/Product/CustomProductDetailsDescription";
import CustomImageGallery from "../organisms/Product/CustomImageGallery";
import CustomNotAvailableButton from "../organisms/Product/CustomNotAvailableButton";
import CustomShippingSimulator from "../organisms/Product/CustomShippingSimulator";

const override: SectionOverride = {
  section: "ProductDetails",
  components: {
    __experimentalShippingSimulation: { Component: CustomShippingSimulator },
    ProductPrice: { Component: CustomProductDetailsPrice },
    ProductTitle: { Component: CustomProductDetailsTitle },
    __experimentalProductDescription: {
      Component: CustomProdutDetailsDescription,
    },
    ImageGalleryViewer: { Component: () => null },
    ImageGallery: { Component: CustomImageGallery },
    __experimentalNotAvailableButton: { Component: CustomNotAvailableButton },
  },
};

export { override };
