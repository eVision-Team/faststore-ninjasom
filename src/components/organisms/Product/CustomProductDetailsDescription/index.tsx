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

/**
 * Wrapper auto-suficiente: cada instância gerencia seu próprio estado de
 * abertura/fechamento sem compartilhar índices com outros Accordions na página.
 *
 * O Accordion do FastStore é totalmente controlado (requer indices + onChange).
 * Encapsular o estado aqui garante que o segundo Accordion, montado de forma
 * dinâmica quando os dados chegam, inicie com estado limpo e independente.
 */
const StandaloneAccordion = ({ children }: { children: React.ReactNode }) => {
  const [indices, setIndices] = useState(new Set<number>());

  const onChange = (index: number) => {
    setIndices((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <Accordion indices={indices} onChange={onChange}>
      {children}
    </Accordion>
  );
};

const CustomProductDetailsDescription = (props: any) => {
  const [getProductById, { data }] = useQuery(GET_PRODUCT_DESCRIPTION, {});
  const context = usePDP();

  const fetchShortDescription = async () => {
    await getProductById({
      productId: context.data.product.isVariantOf.productGroupID,
    });
  };

  // Re-executa a busca sempre que o produto mudar (navegação entre PDPs).
  useEffect(() => {
    fetchShortDescription();
  }, [context.data.product.id]);

  // getProductById retorna um array onde [0] é o produto e [0].Value é o array
  // de especificações técnicas (ex: [{ Name: "Carateristicas:", Value: [...] }]).
  const allItems: any[] = (data as any)?.getProductById?.[0]?.Value ?? [];

  // Filtro resiliente: 'arateristica' cobre 'Carateristica', 'Característica',
  // com ou sem acento, com ou sem 's', ignorando maiúsculas/minúsculas.
  let itensParaRenderizar = allItems.filter((item: any) =>
    item.Name?.toLowerCase().includes("arateristica"),
  );

  // Fallback por posição: índice [2] confirmado nos logs da VTEX como campo alvo.
  if (itensParaRenderizar.length === 0 && allItems[2]) {
    itensParaRenderizar = [allItems[2]];
  }

  return (
    <section className="product-description">
      <StandaloneAccordion>
        <AccordionItem>
          <AccordionButton>{props.descriptionData[0].title}</AccordionButton>
          <AccordionPanel>
            <RenderRichText content={props.descriptionData[0].content} />
          </AccordionPanel>
        </AccordionItem>
      </StandaloneAccordion>

      {itensParaRenderizar.length > 0 && (
        <StandaloneAccordion>
          <AccordionItem>
            <AccordionButton>Mais informações</AccordionButton>
            <AccordionPanel>
              {itensParaRenderizar.map((item: any, index: number) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  {/* join('') envia todas as tags <li> do HTML ao RenderRichText,
                      sem truncar na primeira linha como item.Value[0] fazia. */}
                  <RenderRichText content={(item.Value || []).join("")} />
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </StandaloneAccordion>
      )}
    </section>
  );
};

export default CustomProductDetailsDescription;
