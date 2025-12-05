import React, { useEffect, useMemo, useState } from "react";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_SIMILAR_PRODUCTS } from "./graphql/queries";
import { usePDP } from "@faststore/core";
// import { useCart } from "@faststore/sdk";
import { cartStore } from "./cartStore";
import styles from "../../../../sass/buyTogether/styles.module.scss";
import PlusIcon from "./icons/PlusIcon";
import EqualIcon from "./icons/EqualIcon";
import BuyTogetherProductCard from "./BuyTogetherProductCard";
import BuyTogetherMainProductCard from "./BuyTogetherMainProductCard";

const BuyTogether = () => {
  const [getSimilarProducts, { data, isLoading }] = useQuery(
    GET_SIMILAR_PRODUCTS,
    {}
  );
  const mainProductContext = usePDP();
  //   const { addItem } = useCart();

  const fetchSimilarProducts = async () => {
    await getSimilarProducts({
      productId: mainProductContext.data.product.isVariantOf.productGroupID,
    });
  };

  // Sempre que "data" mudar, registra no console
  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  useEffect(() => {
    // console.log("AAAAAAAAAAAAA", data);

    if ((data as any)?.getSimilarProducts) {
      setSimilarProducts((data as any).getSimilarProducts);
    }
  }, [data]);

  const mainProduct = mainProductContext?.data?.product;
  const [similarProducts, setSimilarProducts] = useState<any>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useMemo para calcular valores de produto e evitar recalcular a cada renderização
  const firstProduct = useMemo(() => similarProducts[0], [similarProducts]);
  const secondProduct = useMemo(() => similarProducts[1], [similarProducts]);
  const pick = (obj: any) => obj?.items?.[0]?.sellers?.[0]?.commertialOffer;

  const getBestPrice = (offer: any) =>
    Math.min(offer?.ListPrice ?? Infinity, offer?.Price ?? Infinity);

  const finalTotal = useMemo(() => {
    const mainProductPrice = mainProduct.offers.lowPrice ?? 0;

    const bestFirstProductPrice = getBestPrice(pick(firstProduct));
    const bestSecondProductPrice = getBestPrice(pick(secondProduct));

    return (
      mainProductPrice +
      (bestFirstProductPrice === Infinity ? 0 : bestFirstProductPrice) +
      (bestSecondProductPrice === Infinity ? 0 : bestSecondProductPrice)
    );
  }, [mainProduct, firstProduct, secondProduct]);


  const itemsToAdd = useMemo(
    () => [
      {
        id: mainProduct?.id ?? "",
        quantity: 1,
        seller: mainProduct?.offers?.offers[0]?.seller ?? "",
        itemOffered: {
          additionalProperty: mainProduct?.additionalProperty,
          brand: mainProduct?.brand,
          gtin: mainProduct?.gtin,
          image: mainProduct?.image,
          isVariantOf: mainProduct?.isVariantOf,
          name: mainProduct?.name,
          sku: mainProduct?.sku,
          unitMultiplier: mainProduct?.unitMultiplier,
        },
        listPrice: mainProduct?.offers?.offers[0]?.listPrice ?? 0,
        listPriceWithTaxes:
          mainProduct?.offers?.offers[0]?.listPriceWithTaxes ?? 0,
        price: mainProduct?.offers?.offers[0]?.price ?? 0,
        priceWithTaxes: mainProduct?.offers?.offers[0]?.priceWithTaxes ?? 0,
      },
      {
        id: firstProduct?.items[0].itemId ?? "",
        quantity: 1,
        seller: {
          identifier: firstProduct?.items?.[0]?.sellers?.[0]?.sellerId ?? "",
        },
        itemOffered: {
          additionalProperty: [],
          brand: {
            name: firstProduct?.brand?.name,
          },
          gtin: "",
          image:
            firstProduct?.items[0]?.images?.map((img: any) => ({
              alternateName: img?.imageLabel ?? "",
              url: img?.imageUrl ?? "",
            })) ?? [],
          isVariantOf: {
            name: firstProduct?.productName,
            productGroupID: firstProduct?.productId,
            skuVariants: {
              activeVariations: {},
              allVariantProducts: {
                name: firstProduct?.productName,
                productID: firstProduct?.productId,
              },
              availableVariations: {},
              slugsMap: {},
            },
          },
          name: firstProduct?.productName,
          sku: firstProduct?.items[0].itemId ?? "",
          unitMultiplier: 1,
        },
        listPrice:
          firstProduct?.items[0].sellers[0].commertialOffer.ListPrice ?? 0,
        listPriceWithTaxes:
          firstProduct?.items[0].sellers[0].commertialOffer.ListPrice ?? 0,
        price: firstProduct?.items[0].sellers[0].commertialOffer.Price ?? 0,
        priceWithTaxes:
          firstProduct?.items[0].sellers[0].commertialOffer.Price ?? 0,
      },
      {
        id: secondProduct?.items[0].itemId ?? "",
        quantity: 1,
        seller: {
          identifier: firstProduct?.items?.[0]?.sellers?.[0]?.sellerId ?? "",
        },
        itemOffered: {
          additionalProperty: [],
          brand: {
            name: secondProduct?.brand?.name,
          },
          gtin: "",
          image:
            secondProduct?.items[0]?.images?.map((img: any) => ({
              alternateName: img?.imageLabel ?? "",
              url: img?.imageUrl ?? "",
            })) ?? [],
          isVariantOf: {
            name: secondProduct?.productName,
            productGroupID: secondProduct?.productId,
            skuVariants: {
              activeVariations: {},
              allVariantProducts: {
                name: secondProduct?.productName,
                productID: secondProduct?.productId,
              },
              availableVariations: {},
              slugsMap: {},
            },
          },
          name: secondProduct?.productName,
          sku: secondProduct?.items[0].itemId ?? "",
          unitMultiplier: 1,
        },
        listPrice:
          secondProduct?.items[0].sellers[0].commertialOffer.ListPrice ?? 0,
        listPriceWithTaxes:
          secondProduct?.items[0].sellers[0].commertialOffer.ListPrice ?? 0,
        price: secondProduct?.items[0].sellers[0].commertialOffer.Price ?? 0,
        priceWithTaxes:
          secondProduct?.items[0].sellers[0].commertialOffer.Price ?? 0,
      },
    ],
    [mainProduct, firstProduct, secondProduct]
  );

  const handleAddToCart = async () => {
    if (!mainProduct || similarProducts.length === 0) {
      console.error("Produtos insuficientes para adicionar ao carrinho");
      return;
    }

    // setIsLoading(true);

    try {
      await Promise.all(
        itemsToAdd.map((item) => {
          return cartStore.addItem(item);
        })
      );

      const minicartButton = document.querySelector(
        ".customNavbarButtons button[data-testid='cart-toggle']"
      ) as HTMLButtonElement | null;
      minicartButton?.click();
    } catch (err) {
      console.error("Erro ao adicionar itens ao carrinho:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  if (!similarProducts.length) return null;

  return (
    <section className={styles.buyTogether}>
      <h2>Aproveite e leve junto</h2>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {mainProduct && (
            <BuyTogetherMainProductCard
              product={mainProduct}
              //   twoProducts={secondProduct ? true : false}
            />
          )}

          {firstProduct && (
            <>
              <PlusIcon />
              <BuyTogetherProductCard
                product={firstProduct}
                // twoProducts={secondProduct ? true : false}
              />
            </>
          )}

          {secondProduct && (
            <>
              <PlusIcon />
              <BuyTogetherProductCard
                product={secondProduct}
                // twoProducts={secondProduct ? true : false}
              />
            </>
          )}

          <EqualIcon />
        </div>

        <div className={styles.addToCartContainer}>
          <div className={styles.productsCount}>
            os {secondProduct ? "3" : "2"} produtos por
          </div>
          <div className={styles.finalPrice}>
            <strong>
              {finalTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
            </strong>
            à vista
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Adicionando..." : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuyTogether;
