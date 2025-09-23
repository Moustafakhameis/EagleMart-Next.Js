export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: CategoryType;
  brand: BrandType;
  ratingsAverage: number;
  quantity: number;
  _id: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};
