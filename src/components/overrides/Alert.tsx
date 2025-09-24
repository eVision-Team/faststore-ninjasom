import { SectionOverride } from "@faststore/core";
import CustomAlert from "../organisms/CustomAlert";

const override: SectionOverride = {
  section: "Alert",
  components: {
    Alert: { Component: () => <CustomAlert /> },
  },
};

export { override };
