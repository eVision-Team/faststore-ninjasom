import React from "react";
import styles from "../../../../../../sass/institutional/eachStore/styles.module.scss";

const HighlightProducts = () => {
  return (
    <section className={styles.highlightProducts}>
      <h2>Produtos em Destaque</h2>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Instrumentos Musicais</h3>

          <div className={styles.imgContainer}>
            <img
              src="https://ninjasomfaststore.vtexassets.com/assets/vtex.file-manager-graphql/images/8ad929ae-7cfc-4ff2-b21e-78b09e0a2bf6___11adaafd733d9e32468b39ce0ae48cc7.jpg"
              alt="Instrumentos Musicais"
            />
          </div>
          <a href="https://whts.co/ninjasom-filial" target="_blank">
            Fale com um especialista em Instrumentos!
          </a>
        </div>
        <div className={styles.card}>
          <h3>Áudio Profissional</h3>
          <div className={styles.imgContainer}>
            <img
              src="https://ninjasomfaststore.vtexassets.com/assets/vtex.file-manager-graphql/images/d9080534-5862-4cf6-afd0-b87b81030c9d___51e506a2552b24846d90a355daae6dec.jpg"
              alt="Áudio Profissional"
            />
          </div>
          <a href="https://whts.co/ninjasom-filial" target="_blank">
            Fale com um especialista em Audio!
          </a>
        </div>
      </div>
    </section>
  );
};

export default HighlightProducts;
