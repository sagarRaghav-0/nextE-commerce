'use server'
import { sql } from "@/db/db";
import { supabase } from "@/db/supabaseClient";
import { NextRequest } from "next/server";

// ================= GET Product ==================
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    console.log(id)

    try {
        const [product] = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`;

        return new Response(
            JSON.stringify(product || null),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (e: unknown) {
        let errorMessage = 'An unknown error occurred';

        if (e instanceof Error) {
            errorMessage = e.message;
        }

        return new Response(
            JSON.stringify({ error: errorMessage }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

// ================= PATCH Product ==================
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    console.log('id:', id)

    try {
        const body = await request.json();
        const {
            name,
            description,
            price,
            discount_price,
            category,
            images,
            stock,
            rating,
            is_trending,
            is_available
        } = body;

        // Ensure boolean values
        const isTrendingBool = Boolean(is_trending);
        const isAvailableBool = Boolean(is_available);

        await sql`
            UPDATE products
            SET
                name = ${name},
                description = ${description},
                price = ${Number(price)},
                discount_price = ${Number(discount_price)},
                category = ${category},
                images = ${images},
                stock = ${Number(stock)},
                rating = ${Number(rating)},
                is_trending = ${isTrendingBool},
                is_available = ${isAvailableBool}
            WHERE id = ${id}
        `;

        return new Response(JSON.stringify({ success: true, message: "Product updated successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return new Response(JSON.stringify({ message: 'Server error', error: err }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// ================= DELETE Product ==================
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    console.log("Product ID to delete:", id);

    try {
        // Get image path
        const [row] = await sql`SELECT images FROM products WHERE id = ${id} LIMIT 1`;
        const imagePath = row?.images;

        // Delete product from DB
        await sql`DELETE FROM products WHERE id = ${id}`;

        // Delete image from Supabase storage
        if (imagePath) {
            const { error: imageDeleteError } = await supabase.storage
                .from('addproducts') // your Supabase bucket name
                .remove([imagePath]);

            if (imageDeleteError) {
                console.error('Error deleting image from storage:', imageDeleteError);
                return new Response(JSON.stringify({
                    message: 'Product deleted but image not removed',
                    imageDeleteError
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response(JSON.stringify({ message: 'Product and image deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error('Unexpected server error:', err);
        return new Response(JSON.stringify({ message: 'Server error', err }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
