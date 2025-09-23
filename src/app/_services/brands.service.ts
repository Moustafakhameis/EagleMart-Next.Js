

import { BrandType } from "../_InterFaces/products";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/brands";


export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetch(BASE_URL, { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch brands");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}


export async function getBrandById(id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch brand");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
}
