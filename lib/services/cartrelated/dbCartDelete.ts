export async function deleteCartItem(productId?: string) {
    const res = await fetch("/api/cartitems", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: productId ? JSON.stringify({ productId }) : undefined,
        // credentials: "include",

        // ✅ if no productId → clears all items
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to remove item(s)");
    return data;
}
