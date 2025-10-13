import React from "react";
import RenderRichText from "../../../../utils/renderRichText";
import styles from "../../../../sass/institutional/paymentMethods/styles.module.scss";

const ExchangesAndReturns = ({ text }: { text: string }) => {
  return (
    <section className={styles.exchangesAndReturns}>
      <RenderRichText content={text} />
    </section>
  );
};

export default ExchangesAndReturns;
