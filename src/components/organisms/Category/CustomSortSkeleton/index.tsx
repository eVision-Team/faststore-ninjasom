import React, { ReactNode, useEffect } from "react";

interface SkeletonProps {
  children?: ReactNode;
}

const CustomSortSkeleton: React.FC<SkeletonProps> = ({ children }) => {
  useEffect(() => {
    const select = document.querySelector("#sort-select") as HTMLSelectElement | null;

    if (!select) {
      console.warn("[SortTranslate] #sort-select não encontrado no DOM.");
      return;
    }

    const translations: Record<string, string> = {
      "Price, descending": "Preço: do maior para o menor",
      "Price, ascending": "Preço: do menor para o maior",
      "Top sales": "Mais vendidos",
      "Name, A-Z": "Nome: A–Z",
      "Name, Z-A": "Nome: Z–A",
      "Release date": "Data de lançamento",
      Discount: "Maior desconto",
      Relevance: "Relevância",
    };

    const options = Array.from(select.options);

    options.forEach((option: HTMLOptionElement) => {
      const original = option.text.trim();
      const translated = translations[original];

      if (translated) {
        option.text = translated;
      } else {
        console.log(`[SortTranslate] Sem tradução para "${original}"`);
      }
    });

  }, []);

  return <>{children}</>;
};

export default CustomSortSkeleton;
