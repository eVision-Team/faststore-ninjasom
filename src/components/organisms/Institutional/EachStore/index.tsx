import React from "react";
import styles from "../../../../sass/institutional/eachStore/styles.module.scss";
import Image from "next/image";
import RenderRichText from "../../../../utils/renderRichText";
import { Carousel, Link } from "@faststore/ui";
import residentialPhoneIcon from "./img/house.png";
import commercialPhoneIcon from "./img/phone.png";
import whatsappIcon from "./img/icon-whatsapp.png";
import emailIcon from "./img/email.png";
import useIsMobile from "../../../hooks/useIsMobile";
import WhatsappIcon from "./img/WhatsappIcon";
import Brands from "./components/Brands/index";
import HighlightProducts from "./components/HighlightProducts";

type Props = {
  storeImages: StoreImage[];
  image: string;
  imageMobile: string;
  mapsLink: string;
  mapsLinkOutsideIframe: string;
  middleText: string;
  address: string;
  residentialPhone: string;
  whatsappPhone: string;
  commercialPhone: string;
  whatsappLink: string;
  email: string;
  singleAddress: string;
  name: string;
};

export interface StoreImage {
  storeImage: string;
}

const EachStore = (props: Props) => {
  const {
    image,
    imageMobile,
    mapsLink,
    mapsLinkOutsideIframe,
    middleText,
    address,
    residentialPhone,
    whatsappPhone,
    commercialPhone,
    whatsappLink,
    email,
    singleAddress,
    name,
  } = props;
  const isMobile = useIsMobile();

  // 🧹 Função auxiliar para limpar e formatar números de telefone
  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return "";
    let clean = phone.replace(/[()\s-]/g, ""); // remove (), espaços e traços
    if (!clean.startsWith("+55")) clean = `+55${clean}`;
    return clean;
  };

  const formattedResidential = formatPhoneNumber(residentialPhone);
  const formattedCommercial = formatPhoneNumber(commercialPhone);

  return (
    <section className={styles.eachStore}>
      {/* Banner */}
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* {image && (
          <Image
            src={isMobile ? imageMobile : image}
            alt="Ninja Som Nossas Lojas"
            width={isMobile ? 360 : 1281}
            height={isMobile ? 380 : 214}
          />
        )} */}

        <div className={styles.bannerInfo}>
          <h2>Ninja Som</h2>
          <h1>{name}</h1>
          <p>{singleAddress}</p>
          <a
            href={whatsappLink}
            target="_blank"
            className={styles.whatsappButton}
          >
            <WhatsappIcon />
            Falar no whatsapp
          </a>
          <div>
            <a href={mapsLinkOutsideIframe} target="_blank">Abrir no Google Maps</a>
            <a href={`tel:${residentialPhone}`}>Ligue agora!</a>
          </div>
        </div>
      </div>

      <Brands />

      <HighlightProducts />

      {/* Info */}
      <div className={styles.storeInfo}>
        {/* Texto do meio */}
        <div className={styles.middleInfo}>
          <RenderRichText content={middleText} />

          <a
            href={whatsappLink}
            target="_blank"
            className={styles.whatsappButton}
          >
            <WhatsappIcon />
            Falar no whatsapp
          </a>
        </div>

        {/* Mapa */}
        {mapsLink && (
          <iframe
            src={mapsLink}
            width="552"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        )}
      </div>

      {/* Lado direito */}
      <div className={styles.rightInfo}>
        {/* Endereço */}
        {address && (
          <div className={styles.address}>
            <RenderRichText content={address} />

            <div className={styles.socials}>
              <a target="_blank" href="https://www.instagram.com/ninjasom">
                <img src="https://ninjasom.vtexassets.com/arquivos/instagram-io.png" />
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/ninjasomoficial"
              >
                <img src="https://ninjasom.vtexassets.com/arquivos/facebook-io.png" />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@ninjasomoficial"
              >
                <img src="https://ninjasom.vtexassets.com/arquivos/youtube-io.png" />
              </a>
              <a
                target="_blank"
                href=" https://www.tiktok.com/@ninja.som"
                title=""
              >
                <img src="https://ninjasom.vtexassets.com/arquivos/tiktok-io.png" />
              </a>
            </div>
          </div>
        )}

        {/* Contato */}
        <div className={styles.contact}>
          <h2>Contato</h2>

          <div className={styles.contactWrapper}>
            {residentialPhone && (
              <Link
                href={`tel:${formattedResidential}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={residentialPhoneIcon} alt="Telefone residencial" />
                {residentialPhone}
              </Link>
            )}

            {commercialPhone && (
              <Link
                href={`tel:${formattedCommercial}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={commercialPhoneIcon} alt="Telefone comercial" />
                {commercialPhone}
              </Link>
            )}

            {whatsappPhone && (
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={whatsappIcon} alt="Whatsapp" />
                {whatsappPhone}
              </Link>
            )}

            {email && (
              <Link href={`mailto:${email}`}>
                <Image src={emailIcon} alt="Email" />
                {email}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Store Images */}
      {props.storeImages?.length > 0 ? (
        <div className={`${styles.storeImages} storeImages`}>
          {isMobile ? (
            <Carousel itemsPerPage={1} variant="slide">
              {props.storeImages.map((image, index) => (
                <Image
                  src={image.storeImage}
                  alt="Imagem da loja"
                  width={247}
                  height={247}
                  key={index}
                />
              ))}
            </Carousel>
          ) : (
            props.storeImages.map((image, index) => (
              <Image
                src={image.storeImage}
                alt="Imagem da loja"
                width={247}
                height={247}
                key={index}
              />
            ))
          )}
        </div>
      ) : null}
    </section>
  );
};

export default EachStore;
