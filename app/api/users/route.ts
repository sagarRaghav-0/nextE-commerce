import { sql } from "@/db/db";


export async function GET() {
    try {
        const data = await sql`SELECT * FROM users`;

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

        const { username, full_name, clerk_id, email, image_url } = body;

        await sql`
            INSERT INTO users (username, full_name, clerk_id, email, image_url)
            VALUES (${username}, ${full_name}, ${clerk_id}, ${email}, ${image_url})
            ON CONFLICT (clerk_id) DO NOTHING
        `;


        return new Response(
            JSON.stringify({ message: "User created successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Failed to create user" }),
            { status: 500 }
        );
    }
}
