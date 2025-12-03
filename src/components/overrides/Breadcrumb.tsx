import { SectionOverride } from "@faststore/core";
import styles from "../../sass/productShelf/styles.module.scss";
import CustomBreadcrumb from "../organisms/Global/CustomBreadcrumb";

const override: SectionOverride = {
  section: "Breadcrumb",
  components: {
    Breadcrumb: { Component: CustomBreadcrumb },
  },
};

export { override };
