import { api } from "../../discovery.config";

export const BASE_URL =
  `https://${api.storeId}.${api.environment}` +
  (api.environment === "vtexcommercestable" ? ".com.br" : ".com");
