import { SectionOverride } from "@faststore/core";
import styles from "../../sass/hero/styles.module.scss";
import CustomHero from "../organisms/CustomHero/";

const override: SectionOverride = {
  section: "Hero",
  components: {
    Hero: {
      Component: () => (
        <CustomHero
          image="https://ninjasomfaststore.vtexassets.com/assets/vtex.file-manager-graphql/images/98eefc48-78aa-4643-9c62-c8cc0976fcf4___a4091e97ce8e728d4622267f0db1442a.png"
          link="/microfone-vocal-dinamico-cardioide-sm-58-lc---shure-11460/p"
        />
      ),
    },
  },
};

export { override };
