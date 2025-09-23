export interface Brand {
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover?: string;
  category?: Category;
  brand?: Brand;
  quantity?: number;
  ratingsAverage?: number;
  subcategory?: SubCategory[];
  price: number;
  priceAfterDiscount?: number;
  id: string;
}

export interface CartProduct {
  count: number;
  price: number;
  product: Product;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
