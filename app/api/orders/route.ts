import { sql } from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        console.log('user Id for check:', userId);

        if (!userId) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const data = await sql`
      SELECT * FROM orders WHERE "user_id" = ${userId} ORDER BY created_at DESC
    `;

        return new Response(
            JSON.stringify(data),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (e: unknown) {
        // Default user-friendly message
        let errorMessage = "Something went wrong while fetching your orders. Please try again.";

        if (e instanceof Error) {
            if (e.message.includes("syntax error")) {
                errorMessage = "There was a problem with the database query.";
            } else if (e.message.includes("connection")) {
                errorMessage = "Database connection failed. Please try again later.";
            } else {
                errorMessage = e.message; // fallback to actual error
            }
        }

        // Log full error for debugging
        console.error("❌ GET /api/orders error:", e);

        // Return structured JSON
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

}
export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const {
            billingDetails,
            items,
            subtotal,
            discount,
            total,
            status
        } = body;

        await sql`
            INSERT INTO orders (
                user_id, 
                billing_details, 
                items, 
                subtotal, 
                discount, 
                total, 
                status
            )
            VALUES (
                ${userId}, 
                ${billingDetails}::jsonb, 
                ${items}::jsonb, 
                ${subtotal}, 
                ${discount}, 
                ${total}, 
                ${status}
            )
        `;

        return new Response(
            JSON.stringify({
                success: true,
                message: "Order placed successfully",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("❌ POST /api/orders error:", error);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
