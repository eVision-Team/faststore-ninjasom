import React from "react";
import LockIcon from "./icons/LockIcon";
import CardIcon from "./icons/CardIcon";
import TruckIcon from "./icons/TruckIcon";
import MascotIcon from "./icons/MascotIcon";
import styles from "../../../../sass/incentives/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import { Carousel } from "@faststore/ui";

type Props = {
  title: string;
};

const items = [
  {
    icon: LockIcon,
    text: "Compra 100% Segura",
  },
  {
    icon: CardIcon,
    text: "Parcelamento em até 10x",
  },
  {
    icon: TruckIcon,
    text: "Entrega em todo Brasil",
  },
  {
    icon: MascotIcon,
    text: "Central de Atendimento",
  },
];

const CustomIncentives = ({ title }: Props) => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.customIncentives}>
      {isMobile ? (
        <Carousel itemsPerPage={1} variant="slide">
          {items.map((item, index) => (
            <div key={index} className={styles.customIncentivesItem}>
              <item.icon />
              <p>{item.text}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={index} className={styles.customIncentivesItem}>
              <item.icon />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomIncentives;
