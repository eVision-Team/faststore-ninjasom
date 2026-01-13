import React from "react";
import xIcon from "../../img/x.png";
import whatsappIcon from "../../img/whatsapp.png";
import facebookIcon from "../../img/facebook.png";
import Image from "next/image";
import styles from "../../../../../../sass/institutional/eachStore/styles.module.scss";

const ShareButtons: React.FC = () => {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent("Confira este conteúdo!");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const openShare = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.shareButtons}>
      <button onClick={() => openShare(shareLinks.twitter)}>
        <Image src={xIcon} alt="X (Twitter)" />
      </button>

      <button onClick={() => openShare(shareLinks.whatsapp)}>
        <Image src={whatsappIcon} alt="Whatsapp" />
      </button>

      <button onClick={() => openShare(shareLinks.facebook)}>
        <Image src={facebookIcon} alt="Facebook" />
      </button>
    </div>
  );
};

export default ShareButtons;
