import { supabase } from "@/db/supabaseClient";

export const uploadImage = async (file: File): Promise<string | null> => {
  const filePath = `${file.name}-${Date.now()}`;

  // Upload image
  const { error: uploadError } = await supabase
    .storage
    .from("addproducts")
    .upload(filePath, file);

  if (uploadError) {
    console.error("❌ Error uploading image:", uploadError.message);
    return null;
  }

  // Get public URL (no error field returned anymore)
  const { data: publicUrlData } = supabase
    .storage
    .from("addproducts")
    .getPublicUrl(filePath);

  if (!publicUrlData?.publicUrl) {
    console.error("❌ Failed to fetch public URL from Supabase.");
    return null;
  }

  console.log("✅ Image uploaded successfully:", publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
};
