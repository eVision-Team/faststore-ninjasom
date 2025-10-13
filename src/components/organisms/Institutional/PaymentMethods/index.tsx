import React from "react";
import RenderRichText from "../../../../utils/renderRichText";
import styles from "../../../../sass/institutional/paymentMethods/styles.module.scss";

const PaymentMethods = ({ text }: { text: string }) => {
  return (
    <section className={styles.paymentMethods}>
      <RenderRichText content={text} />
    </section>
  );
};

export default PaymentMethods;
