import React, { useMemo } from "react";
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
import RDStationScript from "./RdStation";

import WhatsAppFluid from "../WhatsAppFluid";

type Item = {
  title: string;
  link: string;
  /** Linha com ícone + telefone (injetada no normalizador da seção ATENDIMENTO) */
  rowKind?: "whatsapp";
  iconUrl?: string;
};

type Section = {
  title: string;
  items: Item[];
};

type Props = {
  menuSections: Section[];
};

const PHONE_TEL = "tel:+551132242699";
const PHONE_DISPLAY = "(11) 3224-2699";

const SAC_MAILTO = "mailto:sac@ninjasom.com.br";
const WHATSAPP_SAC_TEL = "tel:+551132268087";
const WHATSAPP_SAC_DISPLAY = "(11) 3226-8087";
const WHATSAPP_SAC_ICON_URL =
  "https://ninjasom.vtexassets.com/assets/vtex.file-manager-graphql/images/7e2843ad-88ae-41b7-8835-b882240b6d1a___c78d71331a4cce5b0171a21c3bc7df5b.png";

function normalizeAtendimentoItems(items: Item[]): Item[] {
  const alreadyHasPhone = items.some((i) => {
    if (/\(11\)\s*3224[\s-]?2699/i.test(i.title)) return true;
    const digits = i.link.replace(/\D/g, "");
    return digits.endsWith("551132242699") || digits === "1132242699";
  });

  const alreadyHasSacBlock = items.some((i) => {
    if (/sac@ninjasom\.com\.br/i.test(i.title) || /sac@ninjasom\.com\.br/i.test(i.link))
      return true;
    if (/\(11\)\s*3226[\s-]?8087/i.test(i.title)) return true;
    const d = i.link.replace(/\D/g, "");
    return d.endsWith("551132268087") || d === "1132268087";
  });

  const out: Item[] = [];
  let insertedPhone = alreadyHasPhone;
  let insertedSacBlock = alreadyHasSacBlock;

  for (const raw of items) {
    let title = raw.title;
    if (/^orçamentos$/i.test(title.trim())) {
      title = "VENDAS E ORÇAMENTOS";
    }

    const item: Item = { ...raw, title };
    out.push(item);

    const isVendasEmail =
      /vendas@ninjasom\.com\.br/i.test(item.title) ||
      /vendas@ninjasom\.com\.br/i.test(item.link);

    if (isVendasEmail && !insertedPhone) {
      out.push({ title: PHONE_DISPLAY, link: PHONE_TEL });
      insertedPhone = true;
    }

    const isAtendimentoEmail =
      /atendimento@ninjasom\.com\.br/i.test(item.title) ||
      /atendimento@ninjasom\.com\.br/i.test(item.link);

    if (isAtendimentoEmail && !insertedSacBlock) {
      out.push({ title: "sac@ninjasom.com.br", link: SAC_MAILTO });
      out.push({
        title: WHATSAPP_SAC_DISPLAY,
        link: WHATSAPP_SAC_TEL,
        rowKind: "whatsapp",
        iconUrl: WHATSAPP_SAC_ICON_URL,
      });
      insertedSacBlock = true;
    }
  }

  return out;
}

function normalizeFooterMenuSections(sections: Section[]): Section[] {
  return sections.map((section) => {
    if (!/^atendimento$/i.test(section.title.trim())) {
      return section;
    }
    return { ...section, items: normalizeAtendimentoItems(section.items) };
  });
}

const CustomFooter = ({ menuSections }: Props) => {
  const footerMenuSections = useMemo(
    () => normalizeFooterMenuSections(menuSections),
    [menuSections]
  );

  return (
    <footer className={styles.customFooter}>
      <div className={styles.customFooterWrapper}>
        <div className={styles.firstCol}>
          <Link href="/" className={styles.logo}>
            <Image src={Logo} width={299} height={45} alt="Ninja Som" />
          </Link>
          <p className={styles.copyright}>
            NINJA SOM COMERCIO DE ELETRONICOS E MATERIAIS ELETRICOS LTDA - 2003
            - 2026, todos os direitos reservados.
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
          {/* <Image src={Top100} alt="Top 100 Dealer Finalist" /> */}
        </div>
        <div className={styles.secondCol}>
          {footerMenuSections.map((section, index) => (
            <div key={index}>
              <h4>{section.title}</h4>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={`${itemIndex}-${item.title}-${item.link}`}>
                    {item.rowKind === "whatsapp" && item.iconUrl ? (
                      <a href={item.link} className={styles.whatsappMenuRow}>
                        <img
                          src={item.iconUrl}
                          alt=""
                          width={30}
                          height={30}
                          loading="lazy"
                        />
                        <span>{item.title}</span>
                      </a>
                    ) : item.link.trim().toLowerCase().startsWith("tel:") ? (
                      <a href={item.link}>{item.title}</a>
                    ) : item.link.trim().toLowerCase().startsWith("mailto:") ? (
                      <a href={item.link}>{item.title}</a>
                    ) : (
                      <Link href={item.link}>{item.title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.thirdCol}>
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
      <WhatsAppFluid whatsappUrl="https://whts.co/ninjasom" />
      <RDStationScript />
    </footer>
  );
};

export default CustomFooter;
