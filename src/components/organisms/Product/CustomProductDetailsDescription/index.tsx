import React, { useEffect, useState } from "react";
import { usePDP } from "@faststore/core";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_PRODUCT_DESCRIPTION } from "./graphql/queries";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@faststore/ui";
import RenderRichText from "../../../../utils/renderRichText";

const CustomProductDetailsDescription = (props: any) => {
  const [getProductById, { data }] = useQuery(GET_PRODUCT_DESCRIPTION, {});
  const context = usePDP();
  const [indices, setIndices] = useState<Set<number>>(new Set());
  const [productSpecifications, setProductSpecifications] = useState([]);

  const onChange = (index: number) => {
    const newSet = new Set(indices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setIndices(newSet);
  };

  const fetchShortDescription = async () => {
    await getProductById({
      productId: context.data.product.isVariantOf.productGroupID,
    });
  };

  // Sempre que "data" mudar, registra no console
  useEffect(() => {
    fetchShortDescription();
  }, []);

  const shortDescriptionAccordions = () => {
    if (!data?.getProductById as any) return null;

    // Filtrar apenas os itens desejados
    const itensDesejados = data.getProductById.filter((item: any) =>
      ["Tipo", "Carateristicas:"].includes(item.Name)
    );

    if (itensDesejados.length === 0) return null;

    // ORDEM DESEJADA
    const ordem = ["Tipo", "Carateristicas:"];

    // Ordenar manualmente
    itensDesejados.sort((a: any, b: any) => {
      return ordem.indexOf(a.Name) - ordem.indexOf(b.Name);
    });

    return (
      <AccordionItem>
        <AccordionButton>Mais informações</AccordionButton>
        <AccordionPanel>
          {itensDesejados.map((item: any, index: number) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <RenderRichText content={item.Value[0]} />
            </div>
          ))}
        </AccordionPanel>
      </AccordionItem>
    );
  };

  return (
    <section className="product-description">
      <Accordion indices={indices} onChange={onChange}>
        <AccordionItem>
          <AccordionButton>{props.descriptionData[0].title}</AccordionButton>
          <AccordionPanel>
            <RenderRichText content={props.descriptionData[0].content} />
          </AccordionPanel>
        </AccordionItem>

        {shortDescriptionAccordions()}
      </Accordion>
    </section>
  );
};

export default CustomProductDetailsDescription;
