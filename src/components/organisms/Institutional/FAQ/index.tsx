import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@faststore/ui";
import styles from "../../../../sass/institutional/FAQ/styles.module.scss";
import RenderRichText from "../../../../utils/renderRichText";

type Props = {
  question: string;
  answer: string;
};

const FAQ = ({ faq }: { faq: Props[] }) => {
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
    <section className={`${styles.faq} faq`}>
      <h1>Dúvidas Frequentes</h1>
      <Accordion indices={indices} onChange={onChange}>
        {faq?.map(({ question, answer }, index) => (
          <AccordionItem key={index}>
            <AccordionButton>{question}</AccordionButton>
            <AccordionPanel>
              <RenderRichText content={answer} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
