import styles from "../../../../sass/whatsAppFluid/styles.module.scss";
import WhatsAppIconSrc from "../../../../assets/whatsapp-icon.svg";

type Props = {
  whatsappUrl: string;
};

const WhatsAppFluid = ({ whatsappUrl = "https://whts.co/ninjasom" }: Props) => {
  return (
    <a
      href={whatsappUrl}
      className={styles.floatingButton}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <img
        src={
          (WhatsAppIconSrc as { src?: string } & string).src ||
          (WhatsAppIconSrc as unknown as string)
        }
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />
    </a>
  );
};

export default WhatsAppFluid;
