import { sql } from "@/db/db";


export async function GET() {
    try {
        const data = await sql`SELECT * FROM products`;
        console.log(data);

        return new Response(
            JSON.stringify(data),
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







export async function POST(request: Request) {
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

        await sql`
      INSERT INTO products (
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
      )
      VALUES (
        ${name}, 
        ${description}, 
        ${price}, 
        ${discount_price}, 
        ${category},
        ${images},
        ${stock},
        ${rating},
        ${is_trending},
        ${is_available}
      )
    `;


        return new Response(
            JSON.stringify({ success: true, message: "Product uploaded successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Failed to upload product" }),
            { status: 500 }
        );
    }
}
