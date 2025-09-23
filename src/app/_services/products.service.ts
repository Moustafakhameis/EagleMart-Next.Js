import { ProductType } from "../_InterFaces/products";




export  async function getAllProducts(): Promise<ProductType[] | null> {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products",
        {
          cache: "force-cache",
        }
      );
      const finalResponse = await response.json();
      const data = finalResponse.data;
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  }









export async function getSpecifiedProduct(id: string): Promise<ProductType | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "force-cache",
      }
    );
    const finalResponse = await response.json();
    const data = finalResponse.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}