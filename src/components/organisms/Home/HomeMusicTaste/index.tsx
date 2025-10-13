import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/homeMusicTaste/styles.module.scss";

type Props = {
  title: string;
  link: string;
  image: string;
};

const HomeMusicTaste = ({ genres }: { genres: Props[] }) => {
  return (
    <section className={styles.homeMusicTaste}>
      <h2 className="section-title">Escolha pelo gosto musical</h2>
      <div className={styles.homeMusicTasteList}>
        {genres.map((genre, index) => (
          <Link
            href={genre.link}
            key={index}
            className={`${styles.homeMusicTasteItem} ${
              styles[`homeMusicTasteItem${index + 1}`] || ""
            }`}
          >
            <img src={genre.image} alt={genre.title} />
            <p>{genre.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeMusicTaste;
