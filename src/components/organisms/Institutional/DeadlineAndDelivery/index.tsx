import React from "react";
import RenderRichText from "../../../../utils/renderRichText";
import styles from "../../../../sass/institutional/paymentMethods/styles.module.scss";

const DeadlineAndDelivery = ({ text }: { text: string }) => {
  return (
    <section className={styles.deadlineAndDelivery}>
      <RenderRichText content={text} />
    </section>
  );
};

export default DeadlineAndDelivery;
