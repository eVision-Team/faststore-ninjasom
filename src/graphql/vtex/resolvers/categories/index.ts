import { BASE_URL } from "../../../../constants";

const categoriesResolver = {
  getCategories: async () => {
    const url = `${BASE_URL}/api/catalog_system/pub/categories/tree/1`;

    try {
      const response = await fetch(url);

      if (!response.ok) return null;

      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};

export default categoriesResolver;
