import React, { useState, useEffect, useRef } from "react";
import styles from "../../../sass/homeTabLayout/styles.module.scss";

type Segment = { segment: string };
type Props = { segments: Segment[] };

const HomeTabLayout = ({ segments }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const updateShelves = () => {
      const shelves = document.querySelectorAll<HTMLElement>(".section-product-shelf");
      if (shelves.length >= 6) {
        shelves.forEach((shelf, idx) => {
          if (idx >= 2 && idx <= 5) {
            // controla a visibilidade da shelf
            shelf.style.display = idx === selectedTab + 2 ? "block" : "none";

            // esconde todos os h2 dentro dessa shelf
            const titles = shelf.querySelectorAll<HTMLElement>("h2.text__title-section");
            titles.forEach((title) => {
              title.style.display = "none";
            });
          }
        });
        return true;
      }
      return false;
    };

    if (!updateShelves()) {
      observerRef.current = new MutationObserver(() => {
        if (updateShelves() && observerRef.current) {
          observerRef.current.disconnect();
        }
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => observerRef.current?.disconnect();
  }, [selectedTab]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <section className={styles.homeTabLayout}>
      <h2 className={`${styles.sectionTitle} section-title`}>O melhor do segmento</h2>
      <div className={styles.tabs}>
        {segments.map((item, index) => (
          <button
            key={index}
            className={`${styles.tab} ${index === selectedTab ? styles.selected : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {item.segment}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HomeTabLayout;
