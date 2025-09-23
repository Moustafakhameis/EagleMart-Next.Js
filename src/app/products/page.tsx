import ProductCard from "../_Components/ProductCard/ProductCard";
import SearchInput from "../_Components/ProductCard/SearchInput";
import { getAllProducts } from "../_services/products.service";

export default async function Products({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search || "";

  const allProducts = (await getAllProducts()) ?? [];

  const filteredProducts = search
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts;

  return (
    <div className=" mx-auto p-6 mt-6">
      {/* Search Input (Client Component) */}
      <SearchInput initialSearch={search} />

      {/* Product Grid */}
      <div className="flex flex-wrap justify-center gap-10 p-4 my-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
  //   <div className="flex flex-wrap justify-center gap-10 p-4  my-8">
  //     {allProducts?.map((product) => (
  //       <ProductCard key={product.id} product={product} />
  //     ))}
  //   </div>
  // );
}
