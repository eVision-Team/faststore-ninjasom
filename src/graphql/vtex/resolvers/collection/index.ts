import { BASE_URL } from "../../../../constants";
import pLimit from "p-limit";

const BATCH_LIMIT = 5;
const PAGE_SIZE = 50;

const collectionCache: Record<number, { timestamp: number; data: any[] }> = {};
const CACHE_TTL = 5 * 60 * 1000;

const vtexHeaders = () => ({
  "X-VTEX-API-AppKey": process.env.VTEX_APP_KEY ?? "",
  "X-VTEX-API-AppToken": process.env.VTEX_APP_TOKEN ?? "",
  "Content-Type": "application/json",
});

// Retorna { data, totalPages } em uma única requisição para evitar double fetch.
const fetchCollectionPage = async (
  collectionId: number,
  page: number
): Promise<{ data: any[]; totalPages: number }> => {
  const url = `${BASE_URL}/api/catalog/pvt/collection/${collectionId}/products?Page=${page}&Size=${PAGE_SIZE}`;

  try {
    const response = await fetch(url, { headers: vtexHeaders() });

    if (!response.ok) {
      console.error(`Erro na página ${page}:`, response.status, await response.text());
      return { data: [], totalPages: 1 };
    }

    const result = await response.json();
    return {
      data: result.Data ?? [],
      totalPages: result.TotalPage ?? 1,
    };
  } catch (err) {
    console.error(`Erro na página ${page}:`, err);
    return { data: [], totalPages: 1 };
  }
};

export const collectionResolver = {
  getCollectionById: async (
    _: any,
    { collectionId }: { collectionId: number }
  ) => {
    try {
      const cached = collectionCache[collectionId];
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return { Id: collectionId, Data: cached.data };
      }

      // Primeira página traz também o totalPages — sem double fetch.
      const { data: firstPageData, totalPages } = await fetchCollectionPage(collectionId, 1);
      let allProducts = [...firstPageData];

      if (totalPages > 1) {
        const limit = pLimit(BATCH_LIMIT);
        const requests = [];

        for (let page = 2; page <= totalPages; page++) {
          requests.push(limit(() => fetchCollectionPage(collectionId, page).then((r) => r.data)));
        }

        const results = await Promise.all(requests);
        allProducts = allProducts.concat(...results);
      }

      collectionCache[collectionId] = { timestamp: Date.now(), data: allProducts };

      return { Id: collectionId, Data: allProducts };
    } catch (err) {
      console.error("Erro ao buscar coleção:", err);
      return { Id: collectionId, Data: [] };
    }
  },
};
