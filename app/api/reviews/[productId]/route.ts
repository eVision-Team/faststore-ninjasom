import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;

  if (!productId) {
    return NextResponse.json({ error: "Product ID inválido" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://ninjasomfaststore.vtexcommercestable.com.br/reviews-and-ratings/api/rating/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-VTEX-API-AppKey": process.env.NEXT_PUBLIC_VTEX_APP_KEY!,
          "X-VTEX-API-AppToken": process.env.NEXT_PUBLIC_VTEX_APP_TOKEN!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao buscar rating" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao acessar a API VTEX" }, { status: 500 });
  }
}
