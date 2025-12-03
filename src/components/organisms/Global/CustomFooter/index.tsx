import React from "react";
import styles from "../../../../sass/customFooter/styles.module.scss";
import { Link } from "@faststore/ui";
import Image from "next/image";
import Logo from "./icons/ninjasom-faststore-footer-logo.png";
import { socials, payments } from "./items";
import Top100 from "./icons/top-100.png";
import PciCertifiedLogo from "./icons/pci-certified.png";
import VerifiedRA from "./icons/verified-ra.png";
import Newsletter from "./Newsletter";
import eVisionLogo from "./icons/evision.png";
import vtexLogo from "./icons/vtex.png";

type Item = {
  title: string;
  link: string;
};

type Section = {
  title: string;
  items: Item[];
};

type Props = {
  menuSections: Section[];
};

const CustomFooter = ({ menuSections }: Props) => {

  return (
    <footer className={styles.customFooter}>
      <div className={styles.customFooterWrapper}>
        <div className={styles.firstCol}>
          <Link href="/" className={styles.logo}>
            <Image src={Logo} width={299} height={45} alt="Ninja Som" />
          </Link>
          <p className={styles.copyright}>
            NINJA SOM COMERCIO DE ELETRONICOS E MATERIAIS ELETRICOS LTDA - 2012
            - 2022, todos os direitos reservados.
          </p>
          <p className={styles.copyright}>
            Rua Santa Ifigênia, 556/560/562/564 - Santa Efigênia CEP: 01.207-000
            - São Paulo / SP - CNPJ 07.282.516/0001-15
          </p>
          <div className={styles.socials}>
            {socials.map((social, index) => (
              <Link href={social.link} key={index}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={22.48}
                  height={22.48}
                />
              </Link>
            ))}
          </div>
          {/* <Image src={Top100} alt="Top 100 Dealer Finalist" /> */}
        </div>
        <div className={styles.secondCol}>
          {menuSections.map((section, index) => ( 
            <div key={index}>
              <h4>{section.title}</h4>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.thirdCol}>
          <div className={styles.sectionContainer}>
            <h4>Formas de pagamento</h4>
            <div className={styles.paymentsWrapper}>
              {payments.map((payment, index) => (
                <div key={index}>
                  <Image src={payment.icon} alt={payment.name} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <h4>Segurança</h4>
            <Image src={PciCertifiedLogo} alt="PCI Certified" />
          </div>

          <Image src={VerifiedRA} alt="Verificada por Reclame Aqui" />
        </div>
        <div className={styles.fourthCol}>
          <Newsletter />
        </div>
      </div>
      <div className={styles.dev}>
        <p>feito com orgulho por</p>
        <Link href="https://evision.com.br" target="_blank">
          <Image src={eVisionLogo} alt="eVision" />
        </Link>
        <Link href="https://evision.com.br" target="_blank">
          <Image src={vtexLogo} alt="Vtex" />
        </Link>
      </div>
    </footer>
  );
};

export default CustomFooter;
