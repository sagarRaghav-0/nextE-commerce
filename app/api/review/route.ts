import { sql } from "@/db/db";
import { auth } from "@clerk/nextjs/server";


export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { productId, reviewText } = await request.json();

        await sql`
      INSERT INTO reviews (product_id, user_id, review_text)
      VALUES (${productId}, ${userId}, ${reviewText})
    `;

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("❌ POST /api/reviews error:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        const result = await sql`
      SELECT * FROM reviews WHERE product_id = ${productId} ORDER BY created_at DESC
    `;

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("❌ GET /api/reviews error:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
}

