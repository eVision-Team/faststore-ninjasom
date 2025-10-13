import React from "react";
import styles from "../../../../sass/institutional/workWithUs/styles.module.scss";
import Image from "next/image";
import secondSection from "./img/second-section.png";
import Background from "./img/Background";

type Props = {
  image: string;
  iframeLink: string;
};

const WorkWithUs = ({ image, iframeLink }: Props) => {
  return (
    <section className={styles.workWithUs}>
      <div className={styles.banner}>
        <Image
          src={image}
          alt="Ninja Som Trabalhe Conosco"
          width={1281}
          height={380}
        />
      </div>

      <div className={styles.secondSection}>
        <Image
          src={secondSection}
          alt="Ninja Som Trabalhe Conosco"
          width={495}
          height={359}
        />

        <div className={styles.infoContainer}>
          <h2>Faça parte do time Ninja Som!</h2>
          <p>
            Com mais de 20 anos de atuação no mercado varejista de equipamentos
            de áudio profissional e instrumentos musicais, a Ninja Som trabalha
            com uma alta variedade de produtos, possui o selo de representante
            oficial de marcas prestigiadas e conta com diversas lojas espalhadas
            pelo Brasil.
          </p>
        </div>
      </div>

      <div className={styles.thirdSection}>
        <div className={styles.left}>
          <Background />
          <div className={styles.info}>
            <span>Envie seu</span>
            <h2>Currículo</h2>

            <p>
              Preencha o formulário ao lado, selecione a área de interesse e
              envie seu currículo. Agradecemos o interesse desde já e, caso haja
              alguma vaga disponível que se encaixe com o seu perfil, entraremos
              em contato.
            </p>

            <p>
              Importante: para a área de vendas, o conhecimento de equipamento
              de áudio profissional ou instrumentos musicais é desejável.
              Experiência em vendas é um diferencial.
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <iframe
            src={iframeLink}
            width="450"
            height="455"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
