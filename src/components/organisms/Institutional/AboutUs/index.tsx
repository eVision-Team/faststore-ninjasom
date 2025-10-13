import React from "react";
import RenderRichText from "../../../../utils/renderRichText";
import Image from "next/image";
import mainBanner from "./img/instituciona-banner-main.png";
import styles from "../../../../sass/institutional/aboutUs/styles.module.scss";

type Props = {
  image: string;
  text: string;
  title: string;
};

const AboutUs = ({ image, text, title }: Props) => {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.banner}>
        <Image src={mainBanner} alt={title} width={1281} height={311} />
        <h2>Ninja Som</h2>
        <h1>Quem somos</h1>
      </div>
      <div className={styles.content}>
        <Image src={image} alt={title} width={313} height={600} />
        <div>
          <h2>{title}</h2>
          <RenderRichText content={text} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
