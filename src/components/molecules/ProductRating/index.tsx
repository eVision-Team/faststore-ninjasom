import { useEffect, useState } from "react";
import { Rating } from "@faststore/ui";
import { Icon } from "@faststore/ui";

export default function ProductRating({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);

  const fetchRating = async () => {
    try {
      const res = await fetch(
        `https://ninjasomfaststore.myvtex.com/reviews-and-ratings/api/rating/${productId}`,
        {
          // headers: {
          //   "Content-Type": "application/json",
          //   "X-VTEX-API-AppKey": process.env.NEXT_PUBLIC_VTEX_APP_KEY!,
          //   "X-VTEX-API-AppToken": process.env.NEXT_PUBLIC_VTEX_APP_TOKEN!,
          // },
        }
      );
      const data = await res.json();
      // Supondo que a API retorna { avgRating: number }
      setRating(data.avgRating ?? 0);
    } catch (err) {
      console.error("Erro ao buscar avaliações:", err);
    }
  };

  useEffect(() => {
    if (productId) fetchRating();
  }, [productId]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      <Rating
        length={5}
        value={rating}
        icon={<Icon name="Star" />}
        disabled
        aria-label="Avaliação do produto"
      />
      <span style={{ fontSize: "0.9rem", color: "#666" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
