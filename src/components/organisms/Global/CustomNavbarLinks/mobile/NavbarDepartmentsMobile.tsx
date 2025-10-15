import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Link,
} from "@faststore/ui";
import departments from "../NavbarDepartments/departments";
import styles from "../../../../../sass/customNavbarLinks/styles.module.scss";

const NavbarDepartmentsMobile = () => {
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
    <div className={styles.mobileSubmenu}>
      <Accordion indices={indices} onChange={onChange}>
        {departments?.map(({ name, items }, index) => (
          <AccordionItem key={index}>
            <AccordionButton>{name}</AccordionButton>
            <AccordionPanel>
              <div className={styles.mobileSubmenuLinks}>
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NavbarDepartmentsMobile;
