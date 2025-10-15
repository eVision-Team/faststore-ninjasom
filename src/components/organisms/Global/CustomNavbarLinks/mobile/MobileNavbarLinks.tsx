import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Link,
} from "@faststore/ui";
import menus from "./menus";
import styles from "../../../../../sass/customNavbarLinks/styles.module.scss";

const MobileNavbarLinks = () => {
  const [indices, setIndices] = useState<Set<number>>(new Set());

  const onChange = (index: number) => {
    const newSet = new Set(indices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setIndices(newSet);
  };

  return (
    <div className={`${styles.mobileMenu} mobileMenu`}>
      <Accordion indices={indices} onChange={onChange}>
        {menus?.map(({ label, component, isAccordion, link }, index) => {
          const SubmenuComponent = component;

          return isAccordion ? (
            <AccordionItem key={index}>
              <AccordionButton>{label}</AccordionButton>
              <AccordionPanel>
                {SubmenuComponent && <SubmenuComponent />}
              </AccordionPanel>
            </AccordionItem>
          ) : (
            <Link className={styles.mobileNoSubmenuLink} href={link} key={index}>
              {label}
            </Link>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MobileNavbarLinks;
