import { BASE_URL } from "../../../../constants";
import pLimit from "p-limit";

// Configurações
const BATCH_LIMIT = 5; // quantas requisições paralelas por vez
const PAGE_SIZE = 50;  // tamanho da página da VTEX

// Cache simples em memória (opcional)
const collectionCache: Record<number, { timestamp: number; data: any[] }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Função para buscar uma página específica
const fetchCollectionPage = async (collectionId: number, page: number) => {
  const url = `${BASE_URL}/api/catalog/pvt/collection/${collectionId}/products?Page=${page}&Size=${PAGE_SIZE}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-VTEX-API-AppKey": "vtexappkey-ninjasomfaststore-CUGTSB",
        "X-VTEX-API-AppToken":
          "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Erro na página ${page}:`, response.status, await response.text());
      return [];
    }

    const result = await response.json();
    return result.Data || [];
  } catch (err) {
    console.error(`Erro na página ${page}:`, err);
    return [];
  }
};

export const collectionResolver = {
  getCollectionById: async (
    _: any,
    { collectionId }: { collectionId: number }
  ) => {
    try {
      // Verifica cache
      const cached = collectionCache[collectionId];
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return { Id: collectionId, Data: cached.data };
      }

      // Faz a primeira requisição para obter o total de páginas
      const firstPageData = await fetchCollectionPage(collectionId, 1);
      const firstPageResponse = await fetch(
        `${BASE_URL}/api/catalog/pvt/collection/${collectionId}/products?Page=1&Size=${PAGE_SIZE}`,
        {
          headers: {
            "X-VTEX-API-AppKey": "vtexappkey-ninjasomfaststore-CUGTSB",
            "X-VTEX-API-AppToken":
              "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ",
            "Content-Type": "application/json",
          },
        }
      );

      const firstResult = await firstPageResponse.json();
      const totalPages = firstResult.TotalPage || 1;

      let allProducts = [...firstPageData];

      if (totalPages > 1) {
        const limit = pLimit(BATCH_LIMIT);
        const requests = [];

        // Cria tarefas para cada página, já que a primeira já foi carregada
        for (let page = 2; page <= totalPages; page++) {
          requests.push(limit(() => fetchCollectionPage(collectionId, page)));
        }

        const results = await Promise.all(requests);

        // Junta todos os produtos
        allProducts = allProducts.concat(...results);
      }

      // Armazena no cache
      collectionCache[collectionId] = { timestamp: Date.now(), data: allProducts };

      return {
        Id: collectionId,
        Data: allProducts,
      };
    } catch (err) {
      console.error("Erro ao buscar coleção:", err);
      return {
        Id: collectionId,
        Data: [],
      };
    }
  },
};
