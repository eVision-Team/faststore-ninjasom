import React from "react";
import { useSearch } from "@faststore/sdk";
import styles from "../../../../sass/categorySEO/styles.module.scss";

type Props = {
  categoryPath: string;
  highlightText: string;
  text: string;
  video: string;
};

const CategorySEO = (category: { category: Props[] }) => {
  const search = useSearch();
  const currentCategory = category.category.find(
    (categoryItem) => categoryItem.categoryPath === search.state.base
  );

  return currentCategory && (
    <section className={styles.categorySEO}>
      <div className={styles.left}>
        <p>
          <strong>{currentCategory?.highlightText}</strong>
        </p>
        <p> {currentCategory?.text}</p>
      </div>
      <div className={styles.right}>
        <iframe
          src={currentCategory?.video}
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default CategorySEO;
