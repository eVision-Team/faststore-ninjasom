import React from "react";
import styles from "../../../../sass/institutional/ourStores/styles.module.scss";
import Image from "next/image";
import mainBanner from "./img/our-stores-banner.png";
import residentialPhoneIcon from "./img/house.png";
import commercialPhoneIcon from "./img/phone.png";
import whatsappIcon from "./img/icon-whatsapp.png";
import RenderRichText from "../../../../utils/renderRichText";
import { Link } from "@faststore/ui";

type Props = {
  title: string;
  link: string;
  image: string;
  address: string;
  commercialPhone: string;
  whatsappPhone: string;
  whatsappLink: string;
  residentialPhone: string;
};

const OurStores = ({ stores }: { stores: Props[] }) => {
  console.log(stores);

  return (
    <section className={styles.ourStores}>
      <div className={styles.banner}>
        <Image
          src={mainBanner}
          alt="Ninja Som Nossa Lojas"
          width={1281}
          height={380}
        />
      </div>

      <div className={styles.stores}>
        {stores?.map((store, index) => (
          <Link href={store.link} className={styles.store} key={index}>
            <div className={styles.storeImage}>
              <Image
                src={store.image}
                alt={store.title}
                width={320}
                height={320}
              />
            </div>
            <div className={styles.storeInfo}>
              <h2>{store.title}</h2>
              <div className={styles.address}>
                <RenderRichText content={store.address} />
              </div>
              <div className={styles.phonesWrapper}>
                {store.commercialPhone && (
                  <p className={styles.phones}>
                    <Image src={commercialPhoneIcon} alt="Telefone Comercial" />
                    {store.commercialPhone}
                  </p>
                )}
                {store.whatsappPhone && (
                  <p className={styles.phones}>
                    <Image src={whatsappIcon} alt="Whatsapp" />
                    {store.whatsappPhone}
                  </p>
                )}
                {store.residentialPhone && (
                  <p className={styles.phones}>
                    <Image
                      src={residentialPhoneIcon}
                      alt="Telefone Residencial"
                    />
                    {store.residentialPhone}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurStores;
