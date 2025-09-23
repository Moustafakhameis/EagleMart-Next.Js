import Image from "next/image";
import { ProductDetailsProps } from "_/app/_InterFaces/ProductDetails";
import { getSpecifiedProduct } from "_/app/_services/products.service";
import AddToCartButton from "../../_Components/AddToCartButton/AddToCartButton";

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const specifiedProduct = await getSpecifiedProduct(params.id);

  if (!specifiedProduct) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-400">
        Product not found
      </div>
    );
  }

 // Calculate discount percentage

  let discountPercent: number | null = null;
  let discountAmount: number | null = null;

  if (
    specifiedProduct.priceAfterDiscount &&
    specifiedProduct.price > specifiedProduct.priceAfterDiscount
  ) {
    discountPercent = Math.round(
      ((specifiedProduct.price - specifiedProduct.priceAfterDiscount) /
        specifiedProduct.price) *
        100
    );
    discountAmount = specifiedProduct.price - specifiedProduct.priceAfterDiscount;
  }

  return (
    <div className="container min-h-screen flex flex-col justify-center mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            {/* Discount Badge */}
            {discountPercent && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                {discountPercent}% OFF
              </span>
            )}

            <Image
              src={specifiedProduct.imageCover ?? "/placeholder.png"}
              alt={specifiedProduct.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {specifiedProduct.title}
          </h1>

          {/* Category & Brand */}
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
              {specifiedProduct.category?.name}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
              {specifiedProduct.brand?.name}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {specifiedProduct.description || "No description available."}
          </p>

          {/* Price (with discount if available) */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-4">
              {specifiedProduct.priceAfterDiscount ? (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${specifiedProduct.price}
                  </span>
                  <span className="text-2xl font-semibold text-orange-600">
                    ${specifiedProduct.priceAfterDiscount}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-orange-600">
                  ${specifiedProduct.price}
                </span>
              )}
            </div>

            {/* Discount You save */}
            {discountAmount && (
              <span className="text-green-600 text-sm font-medium">
                You save ${discountAmount}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="font-medium">{specifiedProduct.ratingsAverage}</span>
          </div>

          {/* Quantity */}
          <div
            className={`mb-6 font-medium ${
              specifiedProduct.quantity > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {specifiedProduct.quantity > 0
              ? `In Stock (${specifiedProduct.quantity} available)`
              : "Out of Stock"}
          </div>

          {/* Button */}
     <AddToCartButton productId={specifiedProduct?._id}/>
        </div>
      </div>
    </div>
  );
}
