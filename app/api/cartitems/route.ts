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
      SELECT * FROM cart_items WHERE "userId" = ${userId} ORDER BY created_at DESC
    `;

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
    console.error("❌ POST /api/cartitems error:", e);

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
      productId,
      name,
      description,
      price,
      discount_price,
      category,
      images,
      stock,
      rating,
      is_trending,
      is_available,
      quantity,
      overwrite,   // ✅ new flag from frontend
    } = body;

    if (overwrite) {
      // 🔄 Replace quantity with localStorage value
      await sql`
        INSERT INTO cart_items ("userId", "productId", name, description, price, discount_price, category, images, stock, rating, is_trending, is_available, quantity)
        VALUES (${userId}, ${productId}, ${name}, ${description}, ${price}, ${discount_price}, ${category}, ${images}, ${stock}, ${rating}, ${is_trending}, ${is_available}, ${quantity})
        ON CONFLICT ("userId", "productId")
        DO UPDATE SET quantity = EXCLUDED.quantity
      `;
    } else {
      // ➕ Default behavior → increment quantity
      await sql`
        INSERT INTO cart_items ("userId", "productId", name, description, price, discount_price, category, images, stock, rating, is_trending, is_available, quantity)
        VALUES (${userId}, ${productId}, ${name}, ${description}, ${price}, ${discount_price}, ${category}, ${images}, ${stock}, ${rating}, ${is_trending}, ${is_available}, ${quantity})
        ON CONFLICT ("userId", "productId")
        DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
      `;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Cart item added/updated successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    let errorMessage = "Something went wrong. Please try again.";

    if (e instanceof Error) {
      if (e.message.includes("duplicate key")) {
        errorMessage = "This product is already in your cart.";
      } else if (e.message.includes("syntax error")) {
        errorMessage = "There was a problem with the database query.";
      } else {
        errorMessage = e.message; // fallback to system error
      }
    }

    console.error("❌ POST /api/cartitems error:", e);

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

}




export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { productId } = body as { productId?: string };

    if (productId) {
      // 🔹 Delete single item
      await sql`
        DELETE FROM cart_items
        WHERE "userId" = ${userId} AND "productId" = ${productId}
      `;

      return new Response(
        JSON.stringify({ success: true, message: "Item removed from cart" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // 🔹 Delete all items for this user
      await sql`
        DELETE FROM cart_items
        WHERE "userId" = ${userId}
      `;

      return new Response(
        JSON.stringify({ success: true, message: "All items removed from cart" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (e: unknown) {
    // Default error message for the user
    let errorMessage = "Something went wrong while deleting items. Please try again.";

    if (e instanceof Error) {
      // Check for common database issues and give friendly messages
      if (e.message.includes("foreign key")) {
        errorMessage = "Cannot delete this item due to database restrictions.";
      } else if (e.message.includes("syntax error")) {
        errorMessage = "There was a problem with the database query.";
      } else {
        errorMessage = e.message; // fallback to actual error
      }
    }

    // Log full error for debugging
    console.error("❌ DELETE /api/cartitems error:", e);

    // Return structured JSON so frontend can show a toast or message
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

}


export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { productId, quantity } = await request.json();

    await sql`
      UPDATE cart_items
      SET quantity = ${quantity}
      WHERE "userId" = ${userId} AND "productId" = ${productId}
    `;

    return new Response(
      JSON.stringify({ success: true, message: "Quantity updated" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    // Default message for frontend
    let errorMessage = "Something went wrong while updating quantity. Please try again.";

    if (e instanceof Error) {
      // Friendly messages for common errors
      if (e.message.includes("foreign key")) {
        errorMessage = "Cannot update this item due to database restrictions.";
      } else if (e.message.includes("syntax error")) {
        errorMessage = "There was a problem with the database query.";
      } else {
        errorMessage = e.message; // fallback to actual error
      }
    }

    // Log full error for debugging
    console.error("❌ PATCH /api/cartitems error:", e);

    // Return structured JSON so frontend can display a toast or message
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

}




