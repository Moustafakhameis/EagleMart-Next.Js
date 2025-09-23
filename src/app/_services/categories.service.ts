import { CategoryType } from "_/app/_InterFaces/products";

export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const finalResponse = await response.json();

    if (!finalResponse?.data || !Array.isArray(finalResponse.data)) {
      throw new Error("Invalid categories data format");
    }

    return finalResponse.data as CategoryType[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<CategoryType | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    const finalResponse = await response.json();

    if (!finalResponse?.data) {
      throw new Error("Category data not found");
    }

    return finalResponse.data as CategoryType;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
}
