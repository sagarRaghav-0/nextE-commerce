import { sql } from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";






export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;
    console.log(id)


    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }



        const { status } = await request.json();

        if (
            ![
                "pending",
                "processing",
                "paid",
                "shipped",
                "delivered",
                "out_for_delivery",
                "canceled",
            ].includes(status)
        ) {
            return new Response(JSON.stringify({ error: "Invalid status" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const updated = await sql`
        UPDATE orders
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *
        `;

        if (updated.length === 0) {
            return new Response(JSON.stringify({ error: "Order not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ success: true, data: updated[0] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("❌ PATCH /api/orders/[id] error:", error);
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

}


