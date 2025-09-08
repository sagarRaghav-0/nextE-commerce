export async function updateCartItemQuantity(productId: string, quantity: number) {
  const res = await fetch("/api/cartitems", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
    // credentials: "include", // ✅ important for Clerk session cookie
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update quantity");
  return data;
}
