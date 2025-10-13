import React from "react";
import styles from "../../../../sass/institutional/eachStore/styles.module.scss";
import Image from "next/image";
import RenderRichText from "../../../../utils/renderRichText";
import { Link } from "@faststore/ui";
import residentialPhoneIcon from "./img/house.png";
import commercialPhoneIcon from "./img/phone.png";
import whatsappIcon from "./img/icon-whatsapp.png";
import emailIcon from "./img/email.png";

type Props = {
  storeImages: StoreImage[];
  image: string;
  mapsLink: string;
  middleText: string;
  address: string;
  residentialPhone: string;
  whatsappPhone: string;
  commercialPhone: string;
  whatsappLink: string;
  email: string;
};

export interface StoreImage {
  storeImage: string;
}

const EachStore = (props: Props) => {
  const {
    image,
    mapsLink,
    middleText,
    address,
    residentialPhone,
    whatsappPhone,
    commercialPhone,
    whatsappLink,
    email,
  } = props;

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
      <div className={styles.banner}>
        {image && (
          <Image
            src={image}
            alt="Ninja Som Nossas Lojas"
            width={1281}
            height={214}
          />
        )}
      </div>

      {/* Info */}
      <div className={styles.storeInfo}>
        {/* Mapa */}
        {mapsLink && (
          <iframe
            src={mapsLink}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        )}

        {/* Texto do meio */}
        <div className={styles.middleInfo}>
          <RenderRichText content={middleText} />
        </div>

        {/* Lado direito */}
        <div className={styles.rightInfo}>
          {/* Endereço */}
          {address && (
            <div className={styles.address}>
              <RenderRichText content={address} />
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
                  <Image
                    src={residentialPhoneIcon}
                    alt="Telefone residencial"
                  />
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
      </div>

      {/* Store Images */}
      {props.storeImages?.length > 0 && (
        <div className={styles.storeImages}>
          {props.storeImages?.map((image, index) => (
            <Image
              src={image.storeImage}
              alt="Imagem da loja"
              width={247}
              height={247}
              key={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default EachStore;
