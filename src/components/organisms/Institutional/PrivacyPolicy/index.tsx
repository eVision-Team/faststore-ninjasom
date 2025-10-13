import React from "react";
import RenderRichText from "../../../../utils/renderRichText";
import styles from "../../../../sass/institutional/paymentMethods/styles.module.scss";

const PrivacyPolicy = ({ text }: { text: string }) => {
  return (
    <section className={styles.privacyPolicy}>
      <RenderRichText content={text} />
    </section>
  );
};

export default PrivacyPolicy;
