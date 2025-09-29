const formatPrice = (price) => {
  if (!price) return;
  return price?.toLocaleString("PT-br", { style: "currency", currency: "BRL" });
};

export default formatPrice;
